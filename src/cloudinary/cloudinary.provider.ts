import { v2 as CloudinaryAPI } from 'cloudinary';
import { CLOUDINARY } from './constants';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const CloudinaryProvider: Provider = {
    provide: CLOUDINARY,
    useFactory: (configService: ConfigService) => {
        return CloudinaryAPI.config({
            cloud_name: configService.get("YourCloudinaryName"),
            api_key: configService.get("YourCloudinaryName"),
            api_secret: configService.get("YourCloudinaryName"),
        });
    },
    inject: [ConfigService],
}; 