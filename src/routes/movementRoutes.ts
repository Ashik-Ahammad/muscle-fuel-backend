import { Router } from 'express';
import { getMovementsByRoutine } from '../controllers/movementController.js';

const router = Router();

// GET /api/movements/:routineId — fetch movements for a routine
router.get('/:routineId', getMovementsByRoutine);

export default router;
