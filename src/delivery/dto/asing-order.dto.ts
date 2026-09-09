import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AsignOrderDto {

    @IsNotEmpty()
    @IsUUID()
    @IsString()
    deliveryId: string;
}