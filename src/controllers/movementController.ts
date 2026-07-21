import type { Request, Response } from 'express';
import Movement from '../models/Movement.js';

// GET /api/movements/:routineId
export const getMovementsByRoutine = async (req: Request, res: Response): Promise<void> => {
  try {
    const { routineId } = req.params;

    const movements = await Movement.find({ routineId: routineId as any }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: movements,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch movements',
    });
  }
};
