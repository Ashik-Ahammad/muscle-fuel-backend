import { Router } from 'express';
import { getInventoryData } from '../controllers/manageController.js';

const router = Router();

// GET /api/manage/inventory
router.get('/inventory', getInventoryData);

export default router;
