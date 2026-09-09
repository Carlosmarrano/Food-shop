import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { AsignOrderDto } from './dto/asing-order.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) { }

  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @Post(':id/asing')
  asingOrder(@Param('id', ParseUUIDPipe) id: string, @Body() asingOrderDto: AsignOrderDto) {
    return this.deliveryService.asingOrder(id, asingOrderDto);
  }

  @Get('/available')
  getAvailableDrivers() {
    return this.deliveryService.getAvailableDrivers();
  }

  @Get(':id/metrics')
  getDriverMetrics(@Param('id', ParseUUIDPipe) id: string) {
    return this.deliveryService.getDriverMetrics(id);
  }

  @Patch(':id/status')
  changeShiftStatus(@Param('id', ParseUUIDPipe) id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveryService.changeShiftStatus(id, updateDeliveryDto);
  }

  @Patch(':id/location')
  updateLocation(@Param('id', ParseUUIDPipe) id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.deliveryService.updateLocation(id, updateLocationDto);
  }
}
