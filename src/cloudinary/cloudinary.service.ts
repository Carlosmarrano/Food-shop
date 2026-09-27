import { Injectable, UploadedFile } from "@nestjs/common";
import { v2 } from "cloudinary";
import toStream = require('buffer-to-stream');

@Injectable()

export class CloudinaryService {

    async uploadImageToCloudinary(@UploadedFile() file) {

        return new Promise((resolve, reject) => {

            const upload = v2.uploader.upload_stream((error, result) => {
                if (error) return reject(error);
                resolve(result);
            });

            toStream(file.buffer).pipe(upload);
        });
    };
};