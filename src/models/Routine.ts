import mongoose, { Schema, Document } from 'mongoose';

export interface IRoutine extends Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  bodybuildingStage: 'Bulking' | 'Cutting' | 'Recomposition';
  durationWeeks: number;
  locationContext: string;
  coverImageUrl: string;
  ratingAverage: number;
  reviewsCount: number;
  tier: string;
  efficiency: number;
  burnRate: number;
  isFeatured: boolean;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
}

const RoutineSchema = new Schema<IRoutine>({
  title: { type: String, required: true, trim: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  bodybuildingStage: { type: String, enum: ['Bulking', 'Cutting', 'Recomposition'], required: true },
  durationWeeks: { type: Number, required: true },
  locationContext: { type: String, required: true },
  coverImageUrl: { type: String, default: '' },
  ratingAverage: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  tier: { type: String, default: 'TIER 01' },
  efficiency: { type: Number, default: 0, min: 0, max: 100 },
  burnRate: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IRoutine>('Routine', RoutineSchema);
