import { Router } from "express";
import { signupController, loginController, getUserController } from "../controllers/auth/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/me', authMiddleware, getUserController);
export default router;  