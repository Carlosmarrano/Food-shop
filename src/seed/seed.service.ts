import { Injectable } from '@nestjs/common';
import { FoodService } from '../food/food.service';
import { initialFoodData } from './data/FoodSeed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {

      constructor(
        private readonly foodService: FoodService,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

      ){}

      async runSeedFood() {

        await this.deleteTablesFood();

        const adminUser = await this.InsertUsersforFood();

        await this.insertNewFood(adminUser);
    
        return 'SEED EXECUTED';
      }

      private async deleteTablesFood(){
        await this.foodService.deleteAllFoods();

        const queryBuilder = this.userRepository.createQueryBuilder();

        await queryBuilder
        .delete()
        .where({})
        .execute();
      }

      private async InsertUsersforFood(){

        const seedUsers = initialFoodData.users;
        const users: User[] = [];

        seedUsers.forEach(user => {
          users.push( this.userRepository.create(user));
        })

        const dbUsers = await this.userRepository.save(seedUsers);
        return dbUsers[0];
      }

      private async insertNewFood(user: User) {
    
        await this.foodService.deleteAllFoods();
    
        const foods = initialFoodData.foods;
    
        const insertPromises = [];
    
        foods.forEach( food => {
          insertPromises.push(this.foodService.create(food, user) );
        });
        await Promise.all(insertPromises);
    
        return true;
      }
}
