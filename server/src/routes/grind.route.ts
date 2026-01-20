import { Router } from "express";
import { createGrindSessionController, 
    getAllGrindSessionsController, 
    startGrindTimerController, 
    pauseGrindTimerController, 
    stopGrindTimerController, 
    abandonGrindSessionController, 
    getGrindSessionByIdController,
    updateGrindSessionController, 
    deleteGrindSessionController } from "../controllers/grinds/grinds.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post('/', authMiddleware, createGrindSessionController);
router.get('/', authMiddleware, getAllGrindSessionsController);
router.get('/:id', authMiddleware, getGrindSessionByIdController);
router.put('/:id', authMiddleware, updateGrindSessionController);
router.delete('/:id', authMiddleware, deleteGrindSessionController);
router.post('/:id/start', authMiddleware, startGrindTimerController);
router.post('/:id/pause', authMiddleware, pauseGrindTimerController);
router.post('/:id/stop', authMiddleware, stopGrindTimerController);
router.post('/:id/abandon', authMiddleware, abandonGrindSessionController);

export default router;