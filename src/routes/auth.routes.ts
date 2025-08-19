import { Router } from "express";
import { registerController, loginController, logoutController } from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validation.middleware";
import { registerValidation, loginValidation } from "../validations/auth.validations";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", validateRequest(registerValidation), registerController);
router.post("/login", validateRequest(loginValidation), loginController);
router.post("/logout", authenticateJWT, logoutController);

export default router;