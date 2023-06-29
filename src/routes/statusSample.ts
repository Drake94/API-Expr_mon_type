//Diego Ortega
//09/06/2023
//diegoo@acl.cl

import { Router } from "express";
import statu from '../controllers/statusSampleController'
import verify from '../libs/authJwt'

const route = Router();

route.post('/status', statu.addStatus)

route.get('/status', statu.getStatus)


export default { route }