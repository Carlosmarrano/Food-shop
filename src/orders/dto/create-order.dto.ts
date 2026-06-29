import { Type } from "class-transformer";
import { IsArray, IsInt, IsString, IsUUID, Min, ValidateNested } from "class-validator";

class OrderItemDto {
    @IsString()
    @IsUUID()
    foodId: string;

    @IsInt()
    @Min(1)
    quantity: number;
}

export class CreateOrderDto {

    @IsArray()
    @ValidateNested({
        each: true
    })
    @Type(
        () => OrderItemDto)
    items: OrderItemDto[];
}
