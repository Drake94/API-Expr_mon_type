//Diego Ortega
//17/05/2023
//diegoo@acl.cl
import { NextFunction, Request, Response } from "express";
import Sample, { SampleI } from '../models/Muestra';
import { handleHttp } from "../utils/error.handle";

async function addMuestra (req:Request, res:Response){
    try {
        const {
            sampleType,
            description,
            rutPatient,
            status
        } = req.body

        const muestra : SampleI =({
            sampleType,
            description,
            rutPatient,
            status
        })
        const sample = await Sample.create(muestra)
        const muestraStored = await sample.save()

        res.status(201).send({ muestraStored})
    } catch (e) {
        handleHttp(res, "ERROR_CREATE_SAMPLE")
    }

}

async function getMuestra (req:Request, res:Response) {
    /*find()= consulta. lean()=convertir a objetos planos de JS. 
    exec() ejecuta la consulta para dar cumplimiento a la promesa*/
    const muestra = await Sample.find().lean().exec()
    res.status(200).send({ muestra })
}



async function getMuestraByRut (req:Request, res:Response) {
    /*find()= consulta. lean()=convertir a objetos planos de JS. 
    exec() ejecuta la consulta para dar cumplimiento a la promesa*/
    const Muestrafound = await Sample.find({rutPatient: req.params.rut }).lean().exec()
    if(!Array.isArray(Muestrafound) || Muestrafound.length === 0){
        res.status(404).send("No encontrado")
    }else{
        res.status(200).send({ Muestrafound })
    }
}

async function getMuestraPorRevisar (req:Request, res:Response) {
    /*find()= consulta. lean()=convertir a objetos planos de JS. 
    exec() ejecuta la consulta para dar cumplimiento a la promesa*/
    const Muestrafound = await Sample.find({status: 'Por revisar' }).lean().exec()
    res.status(200).send({ Muestrafound })
}


export default {
    addMuestra,
    getMuestra,
    getMuestraByRut,
    getMuestraPorRevisar
}