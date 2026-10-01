import { Injectable, UploadedFile } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import { Readable } from "typeorm/platform/PlatformTools";

@Injectable()

export class CloudinaryService {

    async uploadImageToCloudinary(file: any): Promise<UploadApiResponse | UploadApiErrorResponse> {

        return new Promise((resolve, reject) => {

            const upload = v2.uploader.upload_stream((error, result) => {
                if (error) return reject(error);
                resolve(result);
            });

            Readable.from(file.buffer).pipe(upload);
        });
    };
};