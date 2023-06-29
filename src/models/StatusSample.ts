//Diego Ortega
//09/06/2023
//dortega@acl.cl
import {Schema, SchemaDefinitionProperty, model} from 'mongoose';
//Describe las estructura de la propiedades

export interface StatusSampleI{
    name : string;
}
const StatusSampleSchema = new Schema<StatusSampleI>({
    name: {
        type: String,
        required: true
    }
})

export default model('statussample', StatusSampleSchema)