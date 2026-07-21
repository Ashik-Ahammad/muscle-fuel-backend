import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Routine from './models/Routine.js';
import Movement from './models/Movement.js';

dotenv.config();

const seedMovements = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;

    if (!mongoUri || !dbName) {
      throw new Error('MONGO_URI or DB_NAME is not defined');
    }

    await mongoose.connect(mongoUri, { dbName });
    console.log('Connected to MongoDB for seeding movements...');

    // Get all routines
    const routines = await Routine.find();
    if (routines.length === 0) {
      console.log('No routines found. Run seed.ts first.');
      process.exit(1);
    }

    // Clear existing movements
    await Movement.deleteMany({});
    console.log('Cleared existing movements.');

    // Movement templates per difficulty
    const movementSets: Record<string, Array<{
      name: string; target: string; stance: string;
      sets: number; reps: string; rest: string; rpe: number;
      isHighlighted: boolean; hasWarning: boolean;
    }>> = {
      Advanced: [
        { name: 'Barbell Deadlift', target: 'Primary Pull', stance: 'Conventional Stance', sets: 5, reps: '3-5', rest: '180s', rpe: 9, isHighlighted: true, hasWarning: false },
        { name: 'Weighted Pull-ups', target: 'Lat Development', stance: 'Neutral Grip', sets: 4, reps: '8-10', rest: '90s', rpe: 8, isHighlighted: false, hasWarning: false },
        { name: 'Barbell Overhead Press', target: 'Deltoid Power', stance: 'Strict Form', sets: 4, reps: '6-8', rest: '120s', rpe: 8.5, isHighlighted: false, hasWarning: true },
        { name: 'Barbell Row', target: 'Upper Back', stance: 'Pendlay Style', sets: 4, reps: '6-8', rest: '120s', rpe: 8, isHighlighted: false, hasWarning: false },
        { name: 'Dips (Weighted)', target: 'Chest/Triceps', stance: 'Forward Lean', sets: 3, reps: '8-12', rest: '90s', rpe: 7.5, isHighlighted: false, hasWarning: false },
      ],
      Intermediate: [
        { name: 'Barbell Back Squat', target: 'Quad Dominant', stance: 'High Bar Position', sets: 4, reps: '8-10', rest: '120s', rpe: 7.5, isHighlighted: true, hasWarning: false },
        { name: 'Romanian Deadlift', target: 'Posterior Chain', stance: 'Hip Hinge', sets: 4, reps: '10-12', rest: '90s', rpe: 7, isHighlighted: false, hasWarning: false },
        { name: 'Dumbbell Bench Press', target: 'Pec Major', stance: 'Flat Bench', sets: 4, reps: '8-12', rest: '90s', rpe: 7.5, isHighlighted: false, hasWarning: false },
        { name: 'Cable Face Pulls', target: 'Rear Delt', stance: 'High Anchor', sets: 3, reps: '15-20', rest: '60s', rpe: 6, isHighlighted: false, hasWarning: false },
      ],
      Beginner: [
        { name: 'Goblet Squat', target: 'Lower Body', stance: 'Wide Stance', sets: 3, reps: '12-15', rest: '60s', rpe: 6, isHighlighted: true, hasWarning: false },
        { name: 'Lat Pulldown', target: 'Back Width', stance: 'Wide Grip', sets: 3, reps: '12-15', rest: '60s', rpe: 6, isHighlighted: false, hasWarning: false },
        { name: 'Machine Chest Press', target: 'Chest', stance: 'Seated', sets: 3, reps: '12-15', rest: '60s', rpe: 6, isHighlighted: false, hasWarning: false },
      ],
    };

    const allMovements: any[] = [];

    for (const routine of routines) {
      const template = movementSets[(routine as any).difficulty] || movementSets['Beginner'];
      if (!template) continue;
      template.forEach((m, index) => {
        allMovements.push({
          routineId: routine._id,
          name: m.name,
          target: m.target,
          stance: m.stance,
          sets: m.sets,
          reps: m.reps,
          rest: m.rest,
          rpe: m.rpe,
          order: index + 1,
          isHighlighted: m.isHighlighted,
          hasWarning: m.hasWarning,
        });
      });
    }

    const inserted = await Movement.insertMany(allMovements);
    console.log(`Seeded ${inserted.length} movements across ${routines.length} routines!`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Movement seeding failed:', error);
    process.exit(1);
  }
};

seedMovements();
