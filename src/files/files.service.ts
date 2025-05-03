import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {

  getStaticFoodImage(imageName: string){

    const path = join(__dirname, '../../static/foods', imageName);

    if(!existsSync(path) ) {
      throw new BadRequestException(`No food found with image ${imageName}`);
    }
    return path;
  }
}