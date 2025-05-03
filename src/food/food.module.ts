import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { FoodImage } from './entities/food_image.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [FoodController],
  providers: [FoodService],
  imports: [
    TypeOrmModule.forFeature([Food, FoodImage]),
    AuthModule
  ],
  exports: [FoodService, TypeOrmModule]
})
export class FoodModule {}
