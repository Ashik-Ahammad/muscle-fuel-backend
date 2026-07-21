import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProfile extends Document {
  userId: string;
  height: string;
  weight: string;
  bodyFat: string;
  goals: string;
  experienceLevel: string;
}

const userProfileSchema = new Schema<IUserProfile>(
  {
    userId: { type: String, required: true, unique: true },
    height: { type: String, default: '' },
    weight: { type: String, default: '' },
    bodyFat: { type: String, default: '' },
    goals: { type: String, default: '' },
    experienceLevel: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserProfile>('UserProfile', userProfileSchema);
