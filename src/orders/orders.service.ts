import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/food/entities/food.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

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
        status: "PENDING",
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

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
