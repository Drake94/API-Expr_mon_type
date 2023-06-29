//Diego Ortega
//17/05/2023
//dortega@acl.cl
import { Router } from "express";
import medicAs from '../controllers/medicoLabController'
import multer from "../libs/multer";

const storage = multer.diskStorage({});
const upload = multer({storage})

const route = Router();

/**
 * @swagger 
 * components:
 *  schemas:
 *    MedicoLab:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: the user name 
 *        cargo: 
 *          type: string
 *          description: the user cargo
 *        correo: 
 *          type: string
 *          description: the user correo
 *        clave:
 *         type: String
 *         description: the user clave
 *        rut: 
 *          type: string
 *          description: the user rut
 *        imgUrl: 
 *          type: string
 *          description: the user imgUrl
 *        publicId: 
 *          type: string
 *          description: the user publicId
 *      required:
 *        - nombre
 *        - cargo
 *        - correo
 *        - clave
 *        - confirmarClave
 *        - rut
 *        - imgUrl
 *        - publicId
 *      example:
 *        nombre: Gabriel L
 *        cargo: Médico
 *        correo: gabriel@acl.cl
 *        clave: DrDq3456
 *        confirmarClave: DrDq3456
 *        rut: 8899964-5
 *        imgUrl: htttps://cloudinary.com/URL
 *        publicId: name IMG
 */

/**
 * @swagger
 * /admin/medicoLab:
 *  post:
 *    summary: Create a medic
 *    tags: [MedicoLab]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/MedicoLab'
 *    responses:
 *      200:
 *        description: New medic created
 */
route.post('/medicoLab', upload.single('image'), medicAs.addMedicoLab)

/**
 * @swagger
 * /admin/medicoLab:
 *  get:
 *    summary: return all medics
 *    tags: [MedicoLab]
 *    responses:
 *      200:
 *        description: all medics
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/MedicoLab'
 */

route.get('/medicoLab', medicAs.getMedicoLab)

/**
 * @swagger
 * /admin/medicoLab/{rut}:
 *  get:
 *    summary: return a medic
 *    tags: [MedicoLab]
 *    parameters:
 *      - in: path
 *        name: rut
 *        schema:
 *          type: string
 *        required: true
 *        description: the user rut
 *    responses:
 *      200:
 *        description: a medics
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/MedicoLab'
 *      404: 
 *        description: User not found 
 */

route.get('/medicoLab/:rut', medicAs.getMedicoLabByRut)


route.post('/medicoLabLogIn', medicAs.medicoLogin)

/**
 * @swagger
 * /admin/medicoLab/{_id}:
 *  put:
 *    summary: update a medic
 *    tags: [MedicoLab]
 *    parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/MedicoLab'
 *    responses:
 *      200:
 *        description: medic Update!
 *      404: 
 *        description: User not found 
 */

route.put('/medicoLab/:_id', upload.single('image'), medicAs.updateMedicoLabById)

/**
 * @swagger
 * /admin/medicoLab/{rut}:
 *  delete:
 *    summary: delete a medic
 *    tags: [MedicoLab]
 *    parameters:
 *      - in: path
 *        name: rut
 *        schema:
 *          type: string
 *        required: true
 *        description: the user rut
 *    responses:
 *      200:
 *        description: medic delete
 *      404: 
 *        description: User not found 
 */

route.delete('/medicoLab/:rut', medicAs.deleteMedicoLab)


export default { route }