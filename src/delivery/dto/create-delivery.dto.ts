import { IsNotEmpty, IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";

export class CreateDeliveryDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;

    @IsString()
    @MinLength(5)
    @MaxLength(25)
    vehicle: string;

    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]{6,8}$/, {
        message: "The license plate is invalid; your license plate must have at least 6 to 8 letters and numbers."
    })
    plate: string;
}