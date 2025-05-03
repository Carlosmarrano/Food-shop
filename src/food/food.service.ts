import { BadGatewayException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { FoodImage } from './entities/food_image.entity';
import { PaginationDto } from 'src/common/pagination-dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class FoodService {

  private readonly logger = new Logger('FoodService');

  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,

    @InjectRepository(FoodImage)
    private readonly foodImageRepository: Repository<FoodImage>,

    private readonly dataSource: DataSource
  ) {}

  async create(createFoodDto: CreateFoodDto, user: User) {
    
    try {
      const { images = [], ...foodDetails } = createFoodDto;

      const food = this.foodRepository.create({
        ...foodDetails,
        images: images.map( image => this.foodImageRepository.create({ url: image}) ),
        user
      });

      await this.foodRepository.save(food);

      return {...food, images};
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0} = paginationDto;

    const foods = await this.foodRepository.find({
      take: limit,
      skip: offset,
      relations:{
        images: true
      }
    })

    return foods.map( food => ({
      ...food,
      images: food.images.map(img => img.url)
    }))
  }

  async findOne(term: string) {
    let food: Food;

    if(isUUID(term) ) {
      food = await this.foodRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.foodRepository.createQueryBuilder('food');

      food = await queryBuilder
      .where('UPPER(title) =:title or slug =:slug', {
        title: term.toUpperCase(),
        slug: term.toLowerCase(),
      }).leftJoinAndSelect('food.images', 'food_image')
      .getOne();
  
    }

    if(!food) {
      throw new NotFoundException(`Food with ${term} not found`);
    }

    return food;
  }

  async findOnePlain(term: string) {
    const { images = [], ...rset } = await this.findOne(term);

    return {
      ...rset,
      images: images.map( image => image.url )
    }
  }

  async update(id: string, updateFoodDto: UpdateFoodDto, user: User) {

    const { images = [], ...toUpdate } = updateFoodDto;

    const food = await this.foodRepository.preload({ id: id, ...toUpdate });

    if(!food){
      throw new NotFoundException(`Food with ${id} not found`);
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      if( images ) {
        await queryRunner.manager.delete(FoodImage, { food: { id} });

        food.images = images.map( image =>
          this.foodImageRepository.create({ url: image })
         )
      } else {
        return food;
      }

      food.user = user;

      await queryRunner.manager.save(food);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const food = await this.findOne(id);
    await this.foodRepository.remove(food);

    return `${food.title} was deleted`;
  }
  
  private handleDBExceptions(error: any){
    if(error.code === '23505')
      throw new BadGatewayException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

  async deleteAllFoods(){

    const query = this.foodRepository.createQueryBuilder('food')

    try{
      return await query.delete()
      .where({})
      .execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
