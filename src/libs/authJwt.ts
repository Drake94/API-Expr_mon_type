
import { NextFunction, Request, Response } from 'express';
import  jwt from 'jsonwebtoken'
import config  from '../../config';
import MedicoLab from '../models/MedicoLab'
import { MedicoLabI } from '../models/MedicoLab';

export interface JWTRequestI extends Request{
    medicoLabId?: string,
    username?: string,
    roles?: string
}

const verifyToken= async (req:JWTRequestI , res:Response, next: NextFunction) => {
    try {
    const token = req.header('x-access-token');
        
    if(!token){
        return res.status(403).send("No se entrego un token ")
    }

    const decoded:any  = jwt.verify(token, config.userLogin.secret ) 

    req.medicoLabId = decoded._id

    const user = await MedicoLab.findById(req.medicoLabId, {clave: 0})
    
    if (!user)
        return res.status(404).send("Usuario no encontrado")

    next()

    } catch (error) {
        return res.status(401).send("No Autorizado")
    }
}

const isMedic = async (req:JWTRequestI, res:Response, next: NextFunction)=>{
    const user:any = await MedicoLab.findById(req.medicoLabId)
    req.roles = user.cargo
    if (req.roles === "Médico" || req.roles === "Tecnólogo"|| req.roles === "TECNÓLOGO" || req.roles === "MÉDICO" || req.roles === "médico" || req.roles === "tecnólogo"){
        next();
        return;
    }
    return res.status(403).send("Se requiere cargo Médico o Tecnólogo");
}

const isTens = async (req:JWTRequestI, res:Response, next: NextFunction)=>{
    const user:any = await MedicoLab.findById(req.medicoLabId)
    req.roles = user.cargo
    if (req.roles === "Tens" || req.roles === "Tecnólogo" || req.roles === "TENS" || req.roles === "TECNÓLOGO"){
        next();
        return;
    }
    return res.status(403).send("Se requiere cargo Tens o Tecnólogo");
}
const isAdmin = async (req:JWTRequestI, res:Response, next: NextFunction)=>{
    const user:any = await MedicoLab.findById(req.medicoLabId)
    req.roles = user.cargo
    if (req.roles === "Administrador" || req.roles === "ADMINISTRADOR"){
        next();
        return;
    }
    return res.status(403).send("Acceso denegado, Solo Administradores");
}

export default {verifyToken, isMedic, isTens, isAdmin}