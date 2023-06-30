import { Router } from "express";
import cargoController from "../controllers/cargoController";
const route = Router();

/**
 * @swagger 
 * components:
 *  schemas:
 *    Role:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the  name 
 *      required:
 *        - name
 *      example:
 *        nombre: Médico
 *        
 */

/**
 * @swagger
 * /admin/role:
 *  post:
 *    summary: Create a Role
 *    tags: [Role]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Role'
 *    responses:
 *      200:
 *        description: New role created
 */

route.post('/role', cargoController.addRole)

/**
 * @swagger
 * /admin/role:
 *  get:
 *    summary: return all role
 *    tags: [Role]
 *    responses:
 *      200:
 *        description: all roles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Role'
 */

route.get('/role', cargoController.getRole)

export default {route};
