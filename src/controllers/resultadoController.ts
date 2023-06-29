//Diego Ortega
//23/05/2023
//dortega@acl.cl
import { Request, Response } from "express";
import Resultado, { ResultI } from '../models/Resultado';
import { handleHttp } from "../utils/error.handle";
            

async function addResultado (req:Request, res:Response){
    try {
        const {
        result,
        sampleType,
        validation,
        rutPatient,
        status,
        } = req.body;
    
        const resultado : ResultI =({
        result,
        sampleType,
        validation,
        rutPatient,
        status,
        })
        const resultCreate = await Resultado.create(resultado)
        const resultadoStored = await resultCreate.save()

        res.status(201).send({ resultadoStored})
    } catch (e) {
        handleHttp(res, 'ERROR_CREATE_RESULT')
    }

}

async function getResultado (req:Request, res:Response) {

    const resultado = await Resultado.find().lean().exec()
    res.status(200).send({ resultado })
}

async function getResultadoByRut (req:Request, res:Response) {

    const resultadofound = await Resultado.find({rutPatient: req.params.rut }).lean().exec()
    res.status(200).send({ resultadofound })

}


async function updateResultadoById (req:Request, res:Response) {
    const updateResultado = await Resultado.findByIdAndUpdate( req.params._id, req.body,{
        new: true
    })
    res.status(204).send({updateResultado})
}

async function deleteResultado (req:Request, res:Response) {
    
    await Resultado.deleteOne({_id: req.params._id}).lean()
    
    res.send("eliminando")
    

}


export default {
    addResultado,
    getResultado,
    getResultadoByRut,
    deleteResultado,
    updateResultadoById
}