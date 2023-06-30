//Diego Ortega
//17/05/2023
//diegoo@acl.cl

import {Schema, model} from 'mongoose';
//Describe las estructura de la propiedades

export interface PacienteI{
    nombrePaciente : string;
    edad : Number;
    rut : string;
}

const PacienteSchema = new Schema<PacienteI>({

    nombrePaciente: {
        type: String,
        required: true
    },
    edad: {
        type: Number
    },
    rut: {
        type: String,
        unique: true,
        required: true
    }
})
export default model('Pacientes', PacienteSchema)