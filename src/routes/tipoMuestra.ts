//Diego Ortega
//23/05/2023
//diegoo@acl.cl

import { Router } from "express";
import sampletype from '../controllers/tipoMuestraController'
import verify from '../libs/authJwt'

const route = Router();

/**
 * @swagger 
 * components:
 *  schemas:
 *    SampleType:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the  name 
 *      required:
 *        - name
 *      example:
 *        nombre: Orina
 *        
 */

/**
 * @swagger
 * /admin/tipomuestra:
 *  post:
 *    summary: Create a sampleType
 *    tags: [SampleType]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/SampleType'
 *    responses:
 *      200:
 *        description: New sampleType created
 */

route.post('/tipomuestra', sampletype.addTipoMuestra)

/**
 * @swagger
 * /admin/tipomuestra:
 *  get:
 *    summary: return all role
 *    tags: [SampleType]
 *    responses:
 *      200:
 *        description: all sampleType
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/SampleType'
 */

route.get('/tipomuestra', sampletype.getTipoMuestra)


export default { route }