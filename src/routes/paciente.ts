//Diego Ortega
//17/05/2023
//diegoo@acl.cl

import { Router } from "express";
import pacient from '../controllers/pacienteController'
import verify from '../libs/authJwt'

const route = Router();

/**
 * @swagger 
 * components:
 *  schemas:
 *    Paciente:
 *      type: object
 *      properties:
 *        nombrePaciente:
 *          type: string
 *          description: the user name 
 *        edad: 
 *          type: number
 *          description: the user Edad
 *        rut: 
 *          type: string
 *          description: the user rut
 *      required:
 *        - nombrePaciente
 *        - edad
 *        - rut
 *      example:
 *        nombrePaciente: Gabriel L
 *        edad: 20
 *        rut: 8899964-5
 */

/**
 * @swagger
 * /admin/paciente:
 *  post:
 *    summary: Create a pacient
 *    tags: [Paciente]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Paciente'
 *    responses:
 *      200:
 *        description: New paciente created
 */

route.post('/paciente', verify.verifyToken, verify.isMedic, pacient.addPaciente)

/**
 * @swagger
 * /admin/paciente:
 *  get:
 *    summary: return all paciente
 *    tags: [Paciente]
 *    responses:
 *      200:
 *        description: all paciente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Paciente'
 */

route.get('/paciente', pacient.getPaciente)

/**
 * @swagger
 * /admin/paciente/{rut}:
 *  get:
 *    summary: return a paciente
 *    tags: [Paciente]
 *    parameters:
 *      - in: path
 *        name: rut
 *        schema:
 *          type: string
 *        required: true
 *        description: the user rut
 *    responses:
 *      200:
 *        description: a paciente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/Paciente'
 *      404: 
 *        description: User not found 
 */

route.get('/paciente/:rut', pacient.getPacienteByRut)

/**
 * @swagger
 * /admin/paciente/{rut}:
 *  delete:
 *    summary: delete a paciente
 *    tags: [Paciente]
 *    parameters:
 *      - in: path
 *        name: rut
 *        schema:
 *          type: string
 *        required: true
 *        description: the user rut
 *    responses:
 *      200:
 *        description: paciente delete
 *      404: 
 *        description: User not found 
 */

route.delete('/paciente/:rut', verify.verifyToken, verify.isMedic, pacient.deletePaciente)


export default {route};