import type { Request, Response } from 'express';
import UserProfile from '../models/UserProfile.js';
import mongoose from 'mongoose';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }
    const userId = req.user.id;

    let profile = await UserProfile.findOne({ userId });

    if (!profile) {
      profile = await UserProfile.create({ userId });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch profile',
    });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, image, height, weight, bodyFat, goals, experienceLevel } = req.body;
    
    if (!req.user?.id) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }
    const userId = req.user.id;

    // 1. Update the UserProfile document (Physical Metrics)
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      { height, weight, bodyFat, goals, experienceLevel },
      { returnDocument: 'after', upsert: true }
    );

    // 2. Update the Name and Image in the better-auth 'user' collection
    if (mongoose.connection.db && (name || image)) {
      const updateData: any = {};
      if (name) updateData.name = name;
      if (image) updateData.image = image;

      try {
        // Try string ID first (some BetterAuth mongo adapters use string IDs)
        let result = await mongoose.connection.db.collection('user').updateOne(
          { _id: userId },
          { $set: updateData }
        );

        // If not matched, try ObjectId
        if (result.matchedCount === 0 && mongoose.Types.ObjectId.isValid(userId)) {
          await mongoose.connection.db.collection('user').updateOne(
            { _id: new mongoose.Types.ObjectId(userId) },
            { $set: updateData }
          );
        }
      } catch (dbErr) {
        console.error('Failed to update better-auth user collection:', dbErr);
      }
    }

    res.status(200).json({
      success: true,
      data: updatedProfile,
      message: 'Profile updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update profile',
    });
  }
};
