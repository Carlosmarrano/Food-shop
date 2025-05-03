import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Get('food/:imageName')
  findFoodImage( 
    @Res() res: Response,
    @Param('imageName') imageName: string) {
    
      const path = this.filesService.getStaticFoodImage(imageName);

      res.sendFile(path);
  }

  @Post('food')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/foods',
      filename: fileNamer
    })
  }) )
  uploadFoodImage(
    @UploadedFile() file: Express.Multer.File) {

      if(!file) {
        throw new BadRequestException('Make sure that file is an image');
      }

      const secureURL = `${ this.configService.get('HOST_API') }/files/foods/${ file.filename }`;

      return { secureURL };
    }
}
