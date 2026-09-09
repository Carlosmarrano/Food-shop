import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Order } from '../orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryService],
  imports: [
    TypeOrmModule.forFeature([Delivery, Order, User, DataSource])
  ],
})
export class DeliveryModule { }
