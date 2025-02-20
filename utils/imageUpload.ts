import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: null | Error, destination: string) => void) => {
        cb(null, './public/uploads');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: null | Error, filename: string) => void) => {
        const name = file.originalname.split('.').slice(0, -1).join('.');
        const ext = file.originalname.split('.').pop(); 

        if (!ext) {
            return cb(new Error("Invalid file name"), "");
        }

        cb(null, `${name}-${Date.now()}.${ext}`);
    },
});

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const imageUpload = multer({ storage, limits: { fileSize: MAX_FILE_SIZE } });

export default imageUpload;