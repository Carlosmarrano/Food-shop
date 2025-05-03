import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PaginationDto } from 'src/common/pagination-dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interface/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @Auth()
  create(
  @Body() createFoodDto: CreateFoodDto,
  @GetUser() user: User
) {
    return this.foodService.create(createFoodDto, user);
  }

  @Get()
  findAll(@Query() paginatonDto: PaginationDto) {
    return this.foodService.findAll(paginatonDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.foodService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
  @Param('id', ParseUUIDPipe) id: string,
  @Body() updateFoodDto: UpdateFoodDto,
  @GetUser() user: User
) {
    return this.foodService.update(id, updateFoodDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.foodService.remove(id);
  } 
}
