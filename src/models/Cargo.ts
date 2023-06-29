//Diego Ortega
//09/06/2023
//dortega@acl.cl
import {Schema, SchemaDefinitionProperty, model} from 'mongoose';
//Describe las estructura de la propiedades

export interface CargoI{
    name : string;
}

const roleSchema = new Schema<CargoI>({
    name: {
        type: String,
        required: true
    }  
})

export default model('role', roleSchema)