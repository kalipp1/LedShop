import * as multer from 'multer';
import { Request } from 'express';

export const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, './public/uploads/products');
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        const name = file.originalname.split('.').slice(0, -1).join('.');
        const ext = file.originalname.split('.').pop();

        if (!ext) {
            return cb(new Error('Invalid file name'), '');
        }

        cb(null, `${name}-${Date.now()}.${ext}`);
    },
});

export const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const multerConfig = { storage, limits: { fileSize: MAX_FILE_SIZE } };