import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const temFolder =  path.resolve(__dirname, '..', '..', 'tmp');


export default {
    directory: temFolder,

    storage: multer.diskStorage({
        destination:temFolder,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('HEX');
            const filename = `${fileHash}-${file.originalname}`;
            
            return callback(null, filename);
        },
    }),
};