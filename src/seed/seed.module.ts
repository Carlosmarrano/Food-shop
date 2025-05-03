import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import {  SeedController } from './seed.controller';
import { FoodModule } from 'src/food/food.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [FoodModule, AuthModule]
})
export class SeedModule {}
