//Diego Ortega
//23/05/2023
//dortega@acl.cl
import {Schema, SchemaDefinitionProperty, model} from 'mongoose';
//Describe las estructura de la propiedades

export interface sampleTypeI{
    name : string;
}

const sampleTypeSchema = new Schema<sampleTypeI>({
    name: {
        type: String,
        required: true
    }
})

export default model('tipomuestras', sampleTypeSchema)