//Diego Ortega
//18/05/2023
//dortega@acl.cl

import { error } from "console";
import multer from 'multer';
import  path  from 'path';

//multer config
multer({
    //donde guardaremos el archivo, se deja vacio por que se subira a cloudinary
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        //nombre original del archivo
        let ext = path.extname(file.originalname);
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
            cb(null,false);
            return console.error(
                "El formato de archivo para la imagen no es soportado, suba un archivo .jpg, .jpeg, .png");
        }
        cb(null, true);
    },
});
export default multer