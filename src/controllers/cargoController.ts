//Diego Ortega
//09/06/2023
//diegoo@acl.cl

import { Request, Response } from "express";
import Cargo, { CargoI } from '../models/Cargo';
import { handleHttp } from "../utils/error.handle";

async function addRole (req:Request, res:Response){
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
            const cargo : CargoI=({
            name
            })
            
            const cargoStored = await Cargo.create(cargo)
            await cargoStored.save();
            res.status(201).send({ cargoStored})
        }        
        
    } catch (e) {
        handleHttp(res, 'ERROR_POST_CARGO')
    }

}

async function getRole (req:Request, res:Response) {
    /*find()= consulta. lean()=convertir a objetos planos de JS. 
    exec() ejecuta la consulta para dar cumplimiento a la promesa*/
    const rolefound = await Cargo.find().lean().exec()
    res.status(200).send({ rolefound })
}


export default {
    addRole,
    getRole
}