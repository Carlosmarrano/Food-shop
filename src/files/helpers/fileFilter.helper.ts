export const fileFilter = ( res: Express.Request, file: Express.Multer.File, callback: Function ) => {

    if(!file) return callback(new Error('File is Empty'), false);

    const fileExtension = file.mimetype.split('/')[1]
    const ValidExtensions = ['jpg', 'jpeg', 'png', 'gif', 'avif', 'webp'];

    if(ValidExtensions.includes(fileExtension) ){
        return callback(null, true);
    }

    callback(null, false)
}