import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateFoodDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    price: number;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

    @Type(() => Number)
    @IsInt()
    @Min(0)
    stock: number;

    @IsOptional()
    @IsBoolean()
    available?: boolean;

    @IsString()
    @MinLength(1)
    category: string;
}