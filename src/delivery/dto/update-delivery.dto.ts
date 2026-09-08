import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryDto } from './create-delivery.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ShiftStatus } from '../entities/delivery.entity';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {

    @IsOptional()
    @IsEnum(ShiftStatus)
    status?: ShiftStatus;
}
