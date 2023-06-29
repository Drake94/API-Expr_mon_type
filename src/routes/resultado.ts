//Diego Ortega
//17/05/2023
//diegoo@acl.cl

import { Router } from "express";
import result from '../controllers/resultadoController'
import verify from '../libs/authJwt'

const route = Router();

route.post('/resultado', verify.verifyToken, verify.isMedic, result.addResultado)

route.get('/resultado', result.getResultado)

route.get('/resultado/:rut', result.getResultadoByRut)

route.delete('/resultado/:_id', verify.verifyToken, verify.isMedic, result.deleteResultado)

route.put('/resultado/:_id', verify.verifyToken, verify.isMedic, result.updateResultadoById)


export default { route }