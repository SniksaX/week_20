import multer from 'multer';
import fs from 'fs';

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/png": "png",
    "image/webp": "webp",
};

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}