import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/food/entities/food.entity';
import { Repository } from 'typeorm';
import { foodStatus, Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interface/valid-roles';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Food)
      private readonly foodRepository: Repository<Food>,

    @InjectRepository(Order)
      private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>
  ){}

  async create(createOrderDto: CreateOrderDto) {
    
    try{
      const { items } = createOrderDto;

      let totalAmount = 0;
      const orderItemsToSave = [];

      for(const item of items){
        const food = await this.foodRepository.findOneBy({ id: item.foodId });

        if(!food){
          throw new BadRequestException(`The product with ID ${item.foodId} does not exist`)
        }

        if(food.stock < item.quantity) {
          throw new BadRequestException(`Sorry, empty stock for: ${food.title}`)
        }

        food.stock -= item.quantity;
        await this.foodRepository.save(food);

        totalAmount += (food.price * item.quantity);

        const orderItem = this.orderItemRepository.create({
        quantity: item.quantity,
        food: food
      });
      orderItemsToSave.push(orderItem);
    }

      const order = this.orderRepository.create({
        status:  foodStatus.pending,
        total: totalAmount,
        items: orderItemsToSave
      });

      await this.orderRepository.save(order);

      return order;

    } catch(error){
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException("Unexpected error creating order");
    }

  }

  async findOrder(id: string) {

    const order = await this.orderRepository.findOne({
      where: {id},
      relations: {
        items: {
          food: true
        },
        user: true
      }
    });

    if (!order) {
      throw new NotFoundException(`The order with ID ${id} was not found`)
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, user: User) {

    const order = await this.orderRepository.findOne({
      where: {id},
      relations: {
        items: {
          food: true
        }
      }
    });

    if (!order){
      throw new NotFoundException(`The order with ID ${id} does not exist`)
    }

    if (order.status === foodStatus.delivered || order.status === foodStatus.cancelled) {
      throw new BadRequestException(`You cannot modify an order that is already ${order.status}`)
    }

    if(user.roles.includes(ValidRoles.delivery) ) {
      if( updateOrderDto.status !== foodStatus.inDelivery && updateOrderDto.status !== foodStatus.delivered) {
        throw new BadRequestException("The delivery driver can only change the status to IN_DELIVERY or DELIVERED")
      }
    }

    if(updateOrderDto.status === foodStatus.cancelled) {
      for(const item of order.items) {
        const food = item.food;

        food.stock += item.quantity;

        await this.foodRepository.save(food);
      }
    }

    if(updateOrderDto.status) {
      order.status = updateOrderDto.status;
    }

    try{
      await this.orderRepository.save(order);
      
      return order;
    } catch(error){
      throw new InternalServerErrorException("Unexpected error updating order")
    }
  }

  async remove(id: string) {
    
    const order = await this.findOrder(id);

    await this.orderRepository.remove(order);

    return { 
      message: `The order ${id} and its concepts have been successfully deleted`
    }
  }
}
