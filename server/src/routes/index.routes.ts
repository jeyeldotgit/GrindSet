import { Router } from "express";
import authRoutes from "./auth.routes";
import grindRoutes from "./grind.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/grind-sessions", grindRoutes);
export default router;