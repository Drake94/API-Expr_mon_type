//Diego Ortega
//09/06/2023
//diegoo@acl.cl

import { Router } from "express";
import statu from '../controllers/statusSampleController'
import verify from '../libs/authJwt'

const route = Router();
/**
 * @swagger 
 * components:
 *  schemas:
 *    Status:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the  name 
 *      required:
 *        - name
 *      example:
 *        nombre: Completado
 *        
 */

/**
 * @swagger
 * /admin/status:
 *  post:
 *    summary: Create a Status
 *    tags: [Status]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Status'
 *    responses:
 *      200:
 *        description: New Status created
 */
route.post('/status', statu.addStatus)

/**
 * @swagger
 * /admin/status:
 *  get:
 *    summary: return all role
 *    tags: [Status]
 *    responses:
 *      200:
 *        description: all status
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Status'
 */

route.get('/status', statu.getStatus)


export default { route }