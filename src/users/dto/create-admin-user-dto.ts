import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAdminUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    role?: string;
}