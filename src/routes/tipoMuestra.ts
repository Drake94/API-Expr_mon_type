//Diego Ortega
//23/05/2023
//diegoo@acl.cl

import { Router } from "express";
import sampletype from '../controllers/tipoMuestraController'
import verify from '../libs/authJwt'

const route = Router();


route.post('/tipomuestra', sampletype.addTipoMuestra)

route.get('/tipomuestra', sampletype.getTipoMuestra)

//api.get('/tipomuestra/:id', gettipomuestraById)

export default { route }