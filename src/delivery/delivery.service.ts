import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery, ShiftStatus } from './entities/delivery.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles } from 'src/auth/interface/valid-roles';

@Injectable()
export class DeliveryService {

  constructor(
    @InjectRepository(Delivery) private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
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
