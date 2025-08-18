import { Router } from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/user.controller";
import { updateUserSchema } from "../validations/auth.validations";
import { validateRequest } from "../middleware/validation.middleware";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateJWT, getUsers);
router.patch("/:id", validateRequest(updateUserSchema), authenticateJWT, updateUser);
router.delete("/:id", authenticateJWT, deleteUser);


export default router;
