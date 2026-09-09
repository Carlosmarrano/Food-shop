import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery, ShiftStatus } from './entities/delivery.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles } from 'src/auth/interface/valid-roles';
import { foodStatus, Order } from 'src/orders/entities/order.entity';
import { UpdateLocationDto } from './dto/update-location.dto';
import { AsignOrderDto } from './dto/asing-order.dto';

@Injectable()
export class DeliveryService {

  constructor(
    @InjectRepository(Delivery) private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(DataSource) private readonly dataSource: DataSource,
  ) { }

  async create(createDeliveryDto: CreateDeliveryDto) {

    const { userId, vehicle, plate } = createDeliveryDto;

    const existingUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    };

    if (!existingUser.roles?.includes(ValidRoles.delivery)) {
      throw new BadRequestException("The selected user doesn't have the delivery role required for this operation.");
    };

    const profileExisting = await this.deliveryRepository.findOne({
      where: { user: { id: userId } },
    });

    if (profileExisting) {
      throw new ConflictException("This user already has an active profile");
    };

    const savedDelivery = this.deliveryRepository.create({
      user: existingUser,
      vehicle,
      plate,
      status: ShiftStatus.offline,
    });

    await this.deliveryRepository.save(savedDelivery);
    return savedDelivery;
  };

  async changeShiftStatus(id: string, updatedDeliveryDto: UpdateDeliveryDto) {

    const { status } = updatedDeliveryDto;

    const profile = await this.deliveryRepository.findOne({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException(`profile with id ${id} not found.`);
    };

    if (status === ShiftStatus.offline) {
      const activeOrder = await this.orderRepository.findOne({
        where: { delivery: { id }, status: foodStatus.inDelivery },
      });

      if (activeOrder) {
        throw new BadRequestException("You cannot change your status to OFFLINE while you have an order en route.");
      };
    };

    profile.status = status;

    await this.deliveryRepository.save(profile);
    return profile;
  };

  async updateLocation(id: string, updateLocationDto: UpdateLocationDto) {

    const { currentLat, currentLng } = updateLocationDto;

    const profile = await this.deliveryRepository.findOne({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException(`profile with id ${id} not found.`)
    };

    if (profile.status === ShiftStatus.offline) {
      throw new BadRequestException("It is not possible to connect to GPS when you are offline");
    };

    await this.deliveryRepository.update(id, { currentLat, currentLng });

    return { success: true };
  };

  async asingOrder(orderId: string, asingOrder: AsignOrderDto) {

    const { deliveryId } = asingOrder;

    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: { delivery: true },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found.`);
    };

    if (order.delivery) {
      throw new ConflictException("Esta orden ya posee un repartidor asignado")
    }

    if (order.status !== foodStatus.pending) {
      throw new ConflictException("Solo se pueden asignar ordenes en estado de pending");
    };

    const delivery = await this.deliveryRepository.findOne({
      where: { id: deliveryId },
    });

    if (!delivery) {
      throw new NotFoundException(`Delivery with id ${deliveryId} not found`);
    };


    if (delivery.status !== ShiftStatus.online) {
      throw new ConflictException("El repartidor no está disponible para recibir órdenes en este momento");
    };

    return await this.dataSource.transaction(async (transactionalEntityManager) => {

      order.delivery = delivery;
      order.status = foodStatus.inDelivery;
      delivery.status = ShiftStatus.in_route;

      await transactionalEntityManager.save(order);
      await transactionalEntityManager.save(delivery);

      return order;
    });
  };

  async getAvailableDrivers(): Promise<Delivery[]> {

    const availableDrivers = await this.deliveryRepository.find({
      where: { status: ShiftStatus.online },
      order: {
        updatedAt: "DESC",
      }
    });

    return availableDrivers;
  }

  findAll() {
    return `This action returns all delivery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} delivery`;
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return `This action updates a #${id} delivery`;
  }

  remove(id: number) {
    return `This action removes a #${id} delivery`;
  }
}
