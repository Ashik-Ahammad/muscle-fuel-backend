import mongoose, { Schema, Document } from 'mongoose';

export interface IUserPlan extends Document {
  userId: mongoose.Types.ObjectId;
  physicalLimitations: string;
  equipment: string[];
  level: string;
  generatedJson: any;
  createdAt: Date;
  updatedAt: Date;
}

const UserPlanSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Requires User model or better-auth to match ObjectId
      required: true,
      index: true,
    },
    physicalLimitations: {
      type: String,
      default: '',
    },
    equipment: {
      type: [String],
      default: [],
    },
    level: {
      type: String,
      required: true,
    },
    generatedJson: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUserPlan>('UserPlan', UserPlanSchema);
