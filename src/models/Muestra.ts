//Diego Ortega
//23/05/2023
//dortega@acl.cl
import {Schema, SchemaDefinitionProperty, model} from 'mongoose';
//Describe las estructura de la propiedades de un formato Json 

export interface SampleI{
    sampleType : string;
    description : string;
    rutPatient : string;
    status : string;
     /// id cloudinary image
}

const sampleSchema = new Schema<SampleI>({ 
    sampleType: {
        ref: "tipomuestras",
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rutPatient: {
        ref: "pacientes",
        type: Schema.Types.String,
        required: true
    },
    status: {
        ref: "status",
        type: Schema.Types.String,
        required: true
    },
},{
    timestamps: true
})

export default model('Samples', sampleSchema)