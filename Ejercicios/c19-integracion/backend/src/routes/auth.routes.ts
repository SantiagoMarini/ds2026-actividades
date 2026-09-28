import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registroSchema, loginSchema } from "../validations/auth.validation";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/registro", validate(registroSchema), authController.registrar);
/* aparece registroSchema y no el type Registro, porque Registro es una 
nomenclatura a la que typescript le "asimila" un tipo, pero en tiempo de ejecucion
los tipos no existen. y las rutas se necesitan en el tiempo de ejecucion, entonces 
ingresamos directamente el registroSchema (LO MISMO PARA EL loginSchema) */
router.post("/login",    validate(loginSchema),    authController.login);
router.get( "/yo",       authenticate,             authController.yo);

export default router;