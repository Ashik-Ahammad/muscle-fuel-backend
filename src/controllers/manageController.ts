import type { Request, Response } from 'express';
import UserPlan from '../models/UserPlan.js';
import Routine from '../models/Routine.js';

export const getInventoryData = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    // Fetch user plans
    const userPlans = await UserPlan.find({ userId: req.user.id as any }).sort({ updatedAt: -1 });
    
    // Fetch total routines for stats
    const totalRoutines = await Routine.countDocuments();

    const inventory = userPlans.map((plan) => {
      // Calculate how long ago it was edited
      const now = new Date();
      const updated = new Date(plan.updatedAt);
      const diffHours = Math.round((now.getTime() - updated.getTime()) / (1000 * 60 * 60));
      
      let lastEdited = '';
      if (diffHours < 24) {
        lastEdited = `Last edited ${diffHours} hours ago`;
      } else {
        lastEdited = `Last edited ${Math.round(diffHours / 24)} days ago`;
      }

      return {
        id: plan._id.toString(),
        title: plan.generatedJson?.plan_id || 'Untitled Protocol',
        lastEdited,
        experienceLevel: plan.level,
        stage: 'Production', // All saved plans are production ready
        duration: plan.generatedJson?.meta?.duration?.replace('_', ' ') || '4 Weeks',
      };
    });

    const data = {
      stats: {
        totalPlans: userPlans.length,
        newThisMonth: userPlans.filter(p => new Date(p.createdAt).getMonth() === new Date().getMonth()).length,
        activeLearners: 1842, // Mock platform stat
        engagementLevel: 'High Engagement'
      },
      inventory,
      pagination: {
        totalItems: userPlans.length,
        showingCount: inventory.length,
        currentPage: 1
      }
    };

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch inventory data',
    });
  }
};
