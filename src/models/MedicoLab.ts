//Diego Ortega
//17/05/2023
//dortega@acl.cl
import {Schema, SchemaDefinitionProperty, model} from 'mongoose';

export interface MedicoLabI{
    nombre : string;
    cargo : string;
    correo : string;
    clave : string;
    rut : string;
    imgUrl : string; 
    publicId : string; /// id cloudinary image
}

const MedicoLabSchema = new Schema<MedicoLabI>({
    nombre: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        unique: true,
        required: true
    },
    clave: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        unique: true,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true,
    }
    
})


export default model('MedicoLabs', MedicoLabSchema)