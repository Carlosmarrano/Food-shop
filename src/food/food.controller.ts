import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PaginationDto } from 'src/common/pagination-dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interface/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFileInterface } from 'src/common/interface/file.interface';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) { }

  @Post()
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createFoodDto: CreateFoodDto,
    @GetUser() user: User,
    @UploadedFile() file?: UploadedFileInterface
  ) {
    return this.foodService.create(createFoodDto, user, file);
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
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFoodDto: UpdateFoodDto,
    @GetUser() user: User,
    @UploadedFile() file?: UploadedFileInterface,
  ) {
    return this.foodService.update(id, updateFoodDto, user, file);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.foodService.remove(id);
  }
}
