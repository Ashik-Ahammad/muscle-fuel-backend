import { Router } from 'express';
import { generatePlan, savePlan, getUserPlans } from '../controllers/planController.js';

const router = Router();

// POST /api/plans/generate
router.post('/generate', generatePlan);

// POST /api/plans
router.post('/', savePlan);

// GET /api/plans
router.get('/', getUserPlans);

export default router;
