import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminUserDto } from './create-admin-user-dto';

export class UpdateUserDto extends PartialType(CreateAdminUserDto) {}
