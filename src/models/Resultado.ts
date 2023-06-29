//Diego Ortega
//23/05/2023
//dortega@acl.cl
import {Schema, SchemaDefinitionProperty, model} from 'mongoose';
//Describe las estructura de la propiedades de un formato Json 

export interface ResultI{
    result : string;
    sampleType : string;
    validation : string;
    rutPatient : string;
    status : string;
     /// id cloudinary image
}

const resultSchema = new Schema<ResultI>({
    result: {
        type: String,
        required: true
    },   
    sampleType: {
        ref: "tipomuestras",
        type: Schema.Types.String,
        required: true
    },
    validation: {
        type: String,
        required: true
    },
    rutPatient: {
        ref: "pacientes",
        type: Schema.Types.String,
        required: true
    },
    status: {
        ref: "statussamples",
        type: Schema.Types.String,
        required: true
    },
},{
    timestamps: true
})

export default model('Results', resultSchema)