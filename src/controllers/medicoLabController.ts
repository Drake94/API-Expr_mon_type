//Diego Ortega
//17/05/2023
//dortega@acl.cl

import { Request, Response } from "express";
import MedicoLab, { MedicoLabI } from '../models/MedicoLab';
import { handleHttp } from "../utils/error.handle";
import cloudinary from '../libs/cloudinary';
import jwt from 'jsonwebtoken'
import config  from '../../config';
import bcrypt from 'bcryptjs'


async function addMedicoLab (req: Request, res: Response){
    try {
        const {
        nombre,
        cargo,
        correo,
        clave,
        confirmarClave,
        rut,
        imgUrl,
        publicId
        } = req.body;

        if(confirmarClave != clave){
            return res.status(400).send('Las claves no son iguales')

        }else if(!req.file){
            return res.status(400).send('Por favor seleccione una imagen')
        

        } else if(clave.length <= 4){
            return res.status(400).send('Clave demasiado corta, mínimo 4 caracteres') 
        }else if(clave.length >= 21){
            return res.status(400).send('Clave demasiado larga, Maximo 20 caracteres') 
        }

        const cloudinary_image = await cloudinary.uploader.upload(req.file.path,{folder: 'imagesSarm'})
        const {secure_url, public_id} = cloudinary_image;
    
        MedicoLab.findOne({ rut }).then((mediclab) => { 
            if (mediclab){
                return res.status(400).send('Rut en uso')
            }else{
                MedicoLab.findOne({ correo }).then(async (mediclab) => { 
                    if (mediclab){
                        return res.status(400).send('Correo en uso')
                    }else if(!nombre){
                        return res.status(400).send('Falta el campo "Nombre"') 
                    }else if(!cargo ){
                        return res.status(400).send('Falta el campo "Cargo"') 
                    }else if(!correo ){
                        return res.status(400).send('Falta el campo "Correo"') 
                    }else if(!clave){
                        return res.status(400).send('Falta el campo "Clave') 
                    }else if(!rut){
                        return res.status(400).send('Falta el campo "Rut"') 
                    }else{
                        const medicoLab : MedicoLabI=({
                            nombre,
                            cargo,
                            correo,
                            clave,
                            rut,
                            imgUrl: secure_url,
                            publicId: public_id
                        })
                        //Encriptar clave
                        const salt = bcrypt.genSaltSync(10)
                        medicoLab.clave =  bcrypt.hashSync(medicoLab.clave, salt)

                        const medicoLabStored = await MedicoLab.create(medicoLab)
                        await medicoLabStored.save();
                    
                        const token = jwt.sign({_id: medicoLabStored._id}, config.userLogin.secret, {
                            expiresIn:31536000
                        })

                        res.status(201).send({ medicoLabStored,token})
                    }})    
            }
        })
        
    } catch (e) {
        handleHttp(res, 'ERROR_POST')
    }

}

async function getMedicoLab (req: Request, res: Response) {
    /*find()= consulta. lean()=convertir a objetos planos de JS. 
    exec() ejecuta la consulta para dar cumplimiento a la promesa*/
    const medicolab = await MedicoLab.find().lean().exec()
    res.status(200).send({ medicolab })
}

async function getMedicoLabByRut (req: Request, res: Response) {
    /*find()= consulta. */
    const medicolabfound = await MedicoLab.find({rut: req.params.rut })
    if(!Array.isArray(medicolabfound) || medicolabfound.length === 0){
        res.status(404).send("No encontrado")
    }else{
        res.status(200).send({ medicolabfound })
    }
    
}

async function updateMedicoLabById (req: Request, res: Response) {
    const updateResultado = await MedicoLab.findByIdAndUpdate( req.params._id, req.body,{
        new: true
    })
    res.status(200).send({updateResultado})
}

async function deleteMedicoLab (req: Request, res: Response) {
    
        const medicolabFound = await MedicoLab.findOne({rut: req.params.rut })
        console.log(medicolabFound)
        if(!Array.isArray(medicolabFound) || medicolabFound.length === 0){

            res.status(404).send("No encontrado")

        }else{

            await MedicoLab.deleteOne({rut: req.params.rut}).lean()
            res.status(200).send("Eliminado")
            
        }
    

}

async function medicoLogin (req: Request, res: Response) {
    //comprueba si existe el correo en el sistema 
    const userFound = await MedicoLab.findOne({correo: req.body.correo})
    if(!userFound)
        return res.status(400).send('Usuario o clave incorrecto')
    //comprueba si la clave sea correcta, además de desencriptarla
    const matchPasswords = bcrypt.compareSync(req.body.clave, userFound.clave)
    if(!matchPasswords)
        return res.status(401).send('Clave o usuario incorrecto')
    
    const token = jwt.sign({_id: userFound._id}, config.userLogin.secret,{expiresIn: 86400})
    res.status(200).send({token,userFound})

}


export default {
    addMedicoLab,
    getMedicoLab,
    getMedicoLabByRut,
    deleteMedicoLab,
    medicoLogin,
    updateMedicoLabById
}