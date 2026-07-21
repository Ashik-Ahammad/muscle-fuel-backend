import type { Request, Response } from 'express';
import Routine from '../models/Routine.js';

interface RoutineQueryParams {
  experienceLevel?: string;
  bodybuildingStage?: string;
  search?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

// GET /api/routines
export const getRoutines = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      experienceLevel,
      bodybuildingStage,
      search,
      sort = 'highest-rated',
      page = '1',
      limit = '8',
    } = req.query as RoutineQueryParams;

    // Build filter object
    const filter: Record<string, any> = {};

    if (experienceLevel && experienceLevel !== 'All') {
      filter.experienceLevel = experienceLevel;
    }

    if (bodybuildingStage && bodybuildingStage !== 'All') {
      filter.bodybuildingStage = bodybuildingStage;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort object
    let sortOption: Record<string, 1 | -1> = {};
    switch (sort) {
      case 'highest-rated':
        sortOption = { ratingAverage: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'duration-asc':
        sortOption = { durationWeeks: 1 };
        break;
      case 'duration-desc':
        sortOption = { durationWeeks: -1 };
        break;
      default:
        sortOption = { ratingAverage: -1 };
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 8;
    const skip = (pageNum - 1) * limitNum;

    const [routines, total] = await Promise.all([
      Routine.find(filter).sort(sortOption).skip(skip).limit(limitNum),
      Routine.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: routines,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasMore: skip + routines.length < total,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch routines',
    });
  }
};

// GET /api/routines/featured
export const getFeaturedRoutine = async (_req: Request, res: Response): Promise<void> => {
  try {
    const featured = await Routine.findOne({ isFeatured: true }).sort({ ratingAverage: -1 });

    if (!featured) {
      // Fallback: return the highest-rated routine
      const topRoutine = await Routine.findOne().sort({ ratingAverage: -1 });
      res.status(200).json({ success: true, data: topRoutine });
      return;
    }

    res.status(200).json({ success: true, data: featured });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch featured routine',
    });
  }
};

// GET /api/routines/:id
export const getRoutineById = async (req: Request, res: Response): Promise<void> => {
  try {
    const routine = await Routine.findById(req.params.id);

    if (!routine) {
      res.status(404).json({ success: false, message: 'Routine not found' });
      return;
    }

    res.status(200).json({ success: true, data: routine });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch routine',
    });
  }
};
