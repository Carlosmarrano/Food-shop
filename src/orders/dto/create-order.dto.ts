import { IsInt, IsString, IsUUID, Min } from "class-validator";

export class CreateOrderDto {

    @IsString()
    @IsUUID()
    foodId: string;

    @IsInt()
    @Min(1)
    quantity: number;
}
