//Diego Ortega
//23/05/2023
//diegoo@acl.cl
import { Request, Response } from "express";
import TipoMuestra, { sampleTypeI } from '../models/TipoMuestra';
import { handleHttp } from "../utils/error.handle";
            


async function addTipoMuestra (req:Request, res:Response){
    try {
        const {
            name

        } = req.body

        const tipoMuestra : sampleTypeI =({
            name
        })

        const sampletypeCreate = await TipoMuestra.create(tipoMuestra)
        const tipoMuestraStored = await sampletypeCreate.save()

        res.status(201).send({ tipoMuestraStored})
    } catch (e) {
        handleHttp(res, 'ERROR_CREATE_SAMPLETYPE')
    }

}

async function getTipoMuestra (req:Request, res:Response) {
    /*find()= consulta. lean()=convertir a objetos planos de JS. 
    exec() ejecuta la consulta para dar cumplimiento a la promesa*/
    const tipoMuestra = await TipoMuestra.find().lean().exec()
    res.status(200).send({ tipoMuestra })
}


export default {
    addTipoMuestra,
    getTipoMuestra
}