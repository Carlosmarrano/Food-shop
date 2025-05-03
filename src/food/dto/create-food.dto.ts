import { IsArray, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateFoodDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];
}