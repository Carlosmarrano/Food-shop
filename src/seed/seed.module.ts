import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import {  SeedController } from './seed.controller';
import { FoodModule } from 'src/food/food.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [SeedController],
  providers: [SeedService, ConfigService],
  imports: [FoodModule, AuthModule, TypeOrmModule.forFeature([User, Order])]
})
export class SeedModule {}
