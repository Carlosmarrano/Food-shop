import { v4 as uuid } from 'uuid';

export const fileNamer = ( res: Express.Request, file: Express.Multer.File, callback: Function ) => {

    if(!file) return callback(new Error('File is Empty'), false);

    const fileExtension = file.originalname.split('.')[1];
    const filename = `${ uuid() }.${fileExtension}`;

    callback(null, filename);
}