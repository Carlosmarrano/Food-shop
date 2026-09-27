import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
    provider: CLOUDINARY,
    useFactory: () => {
        return v2.config({
            cloud_name: "YourCloudName",
            api_key: "yourApiKey",
            api_secret: "YourApiSecret",
        });
    },
};