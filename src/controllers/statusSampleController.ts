//Diego Ortega
//09/06/2023
//diegoo@acl.cl

import { Request, Response } from "express";
import StatusSample, { StatusSampleI } from '../models/StatusSample';
import { handleHttp } from "../utils/error.handle";
            

async function addStatus (req:Request, res:Response){
    try {
        const {
            names

        } = req.body

        const name = names[0].toUpperCase() + names.slice(1);
        console.log(name)
        if(name.length <= 3){
            return res.status(400).send('Nombre no puede tener menos de 3 letras')

        }else if (name.length >= 15){
            return res.status(400).send('Nombre no puede tener más de 15 letras')
        }else{
            const statussample : StatusSampleI =({
            name
            })
            
            const statusCreate = await StatusSample.create(statussample)
            const statusStored = await statusCreate.save()
            res.status(201).send({ statusStored})
        }        
        
    } catch (e) {
        handleHttp(res, 'ERROR_CREATE_STATUS')
    }

}

async function getStatus (req:Request, res:Response) {
    /*find()= consulta. lean()=convertir a objetos planos de JS. 
    exec() ejecuta la consulta para dar cumplimiento a la promesa*/
    const statusfound = await StatusSample.find().lean().exec()
    res.status(200).send({ statusfound })
}


export default{
    addStatus,
    getStatus
}