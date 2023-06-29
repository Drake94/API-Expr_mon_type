import { Router } from "express";
import cargoController from "../controllers/cargoController";
const route = Router();

route.post('/role', cargoController.addRole)

route.get('/role', cargoController.getRole)

export default {route};
