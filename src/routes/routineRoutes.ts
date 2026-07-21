import { Router } from 'express';
import { getRoutines, getFeaturedRoutine, getRoutineById } from '../controllers/routineController.js';

const router = Router();

// GET /api/routines — fetch routines with filters/pagination
router.get('/', getRoutines);

// GET /api/routines/featured — fetch the featured routine
router.get('/featured', getFeaturedRoutine);

// GET /api/routines/:id — fetch a single routine by ID
router.get('/:id', getRoutineById);

export default router;
