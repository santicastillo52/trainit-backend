import { Router } from "express";
import { registerController, loginController } from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validation.middleware";
import { registerValidation, loginValidation } from "../validations/auth.validations";

const router = Router();

router.post("/register", validateRequest(registerValidation), registerController);
router.post("/login", validateRequest(loginValidation), loginController);

export default router;