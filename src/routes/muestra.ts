//Diego Ortega
//23/05/2023
//diegoo@acl.cl

import { Router } from "express";
import sample from '../controllers/muestraController'
import verify from '../libs/authJwt'

const route = Router();

route.post('/muestra',verify.verifyToken, verify.isTens, sample.addMuestra)

route.get('/muestra', sample.getMuestra)

route.get('/muestra/:rut', sample.getMuestraByRut)

export default { route }