import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interface/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Auth()
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User) {
    return this.ordersService.create(createOrderDto, user);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.delivery)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOrder(id);
  }

  @Get()
  @Auth()
  findAllOrderByUser(@GetUser() user: User) {
    return this.ordersService.findAllOrderByUser(user.id)
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.delivery)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderDto: UpdateOrderDto, @GetUser() user: User) {
    return this.ordersService.update(id, updateOrderDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.remove(id);
  }
}
