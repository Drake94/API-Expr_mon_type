import { Request, Response } from "express";
import Paciente, { PacienteI } from '../models/Paciente';
import { handleHttp } from "../utils/error.handle";

async function addPaciente (req:Request, res:Response){
    try {
        const {
            nombrePaciente,
            edad,
            rut
        } = req.body

        const paciente : PacienteI =({
            nombrePaciente,
            edad,
            rut
        })
        const pacienteCreate = await Paciente.create(paciente)
        const pacienteStored = await pacienteCreate.save()

        res.status(201).send({ pacienteStored})
    } catch (e) {
        handleHttp(res, "ERROR_CREATE_PACIENT")
    }

}

async function getPaciente (req:Request, res:Response) {
    /*find()= consulta. lean()=convertir a objetos planos de JS. 
    exec() ejecuta la consulta para dar cumplimiento a la promesa*/
    const paciente = await Paciente.find().lean().exec()
    res.status(200).send({ paciente })
}

async function getPacienteByRut (req:Request, res:Response) {
    /*find()= consulta. lean()=convertir a objetos planos de JS. 
    exec() ejecuta la consulta para dar cumplimiento a la promesa*/
    const pacientefound = await Paciente.find({rut: req.params.rut }).lean().exec()
    if(!pacientefound || []){
        res.status(404).send("No encontrado")
    }else{
        res.status(200).send({ pacientefound })
    }

}

async function deletePaciente (req:Request, res:Response) {
    await Paciente.deleteOne({rut: req.params.rut}).lean()

    res.send("eliminando")
    

}

export default {
    addPaciente,
    getPaciente,
    getPacienteByRut,
    deletePaciente
}