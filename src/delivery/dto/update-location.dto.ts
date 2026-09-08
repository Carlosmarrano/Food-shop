import { IsLatitude, IsLongitude, IsNotEmpty, IsString } from "class-validator";


export class UpdateLocationDto {

    @IsLatitude()
    @IsString()
    @IsNotEmpty()
    currentLat: string;

    @IsLongitude()
    @IsString()
    @IsNotEmpty()
    currentLng: string;
}