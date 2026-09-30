export interface UploadedFileInterface {
    fieldname: string;
    originalName: string;
    endcoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}