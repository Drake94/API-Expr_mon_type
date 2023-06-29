//Diego Ortega
//17/05/2023
//diegoo@acl.cl

import { Router } from "express";
import pacient from '../controllers/pacienteController'
import verify from '../libs/authJwt'

const route = Router();


route.post('/paciente', verify.verifyToken, verify.isMedic, pacient.addPaciente)

route.get('/paciente', pacient.getPaciente)

route.get('/paciente/:rut', pacient.getPacienteByRut)

route.delete('/paciente/:rut', verify.verifyToken, verify.isMedic, pacient.deletePaciente)


export default {route};