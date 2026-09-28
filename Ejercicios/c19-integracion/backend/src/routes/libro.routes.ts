import { Router } from "express";
import * as libroController from "../controllers/libro.controller";
import { validate, validateParams, validateQuery } from "../middlewares/validate.middleware";
import { idParamSchema } from "../validations/libro.validation";
import { libroCreateSchema, libroUpdateSchema, libroQuerySchema } from "../validations/libro.validation";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", validateQuery(libroQuerySchema), libroController.getAll);
router.get("/:id", validateParams(idParamSchema), libroController.getById);
router.post("/", authenticate, authorize("ADMIN"), validate(libroCreateSchema), libroController.create);
router.put("/:id",authenticate, authorize("ADMIN"), validateParams(idParamSchema), validate(libroUpdateSchema), libroController.update);
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), libroController.remove);

export default router;