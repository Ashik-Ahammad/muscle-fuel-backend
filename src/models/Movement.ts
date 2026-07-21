import mongoose, { Schema, Document } from 'mongoose';

export interface IMovement extends Document {
  routineId: mongoose.Types.ObjectId;
  name: string;
  target: string;
  stance: string;
  sets: number;
  reps: string;
  rest: string;
  rpe: number;
  order: number;
  isHighlighted: boolean;
  hasWarning: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MovementSchema: Schema = new Schema(
  {
    routineId: {
      type: Schema.Types.ObjectId,
      ref: 'Routine',
      required: [true, 'Routine ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Movement name is required'],
      trim: true,
    },
    target: {
      type: String,
      required: [true, 'Target muscle group is required'],
    },
    stance: {
      type: String,
      default: '',
    },
    sets: {
      type: Number,
      required: true,
      min: 1,
    },
    reps: {
      type: String,
      required: true,
    },
    rest: {
      type: String,
      required: true,
    },
    rpe: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    order: {
      type: Number,
      default: 0,
    },
    isHighlighted: {
      type: Boolean,
      default: false,
    },
    hasWarning: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMovement>('Movement', MovementSchema);
