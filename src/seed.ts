import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Routine from './models/Routine.js';

dotenv.config();

// A fixed ObjectId to act as the system creator for seeded data
const SYSTEM_CREATOR_ID = new mongoose.Types.ObjectId('665f1a2b3c4d5e6f7a8b9c0d');

const seedRoutines = [
  {
    title: 'Hypertrophy V4: The Obsidian Protocol',
    shortDescription: 'AI-optimized hypertrophy program analyzing 50,000+ athlete biomechanics for maximum mechanical tension and growth.',
    fullDescription: 'Generated using biomechanical analysis of over 50,000 professional athlete datasets. This protocol optimizes mechanical tension through a specific cadence of eccentric loading and peak contraction holds. Week-by-week progressive overload is auto-calibrated to your 1RM percentages, ensuring consistent adaptation without plateaus. Includes deload microcycles at weeks 4 and 8.',
    price: 29.99,
    experienceLevel: 'Advanced',
    bodybuildingStage: 'Bulking',
    durationWeeks: 12,
    locationContext: 'Gym / Commercial Facility',
    coverImageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    tier: 'TIER 01',
    efficiency: 98.2,
    burnRate: 740,
    ratingAverage: 4.98,
    reviewsCount: 3200,
    isFeatured: true,
    createdBy: SYSTEM_CREATOR_ID,
  },
  {
    title: 'Upper Body Kinetic Force',
    shortDescription: 'High-intensity upper body compound movements protocol for maximum muscle activation and progressive overload.',
    fullDescription: 'A high-intensity upper body routine focused on compound movements for maximum muscle activation. Emphasizes progressive overload through periodized rep schemes across bench press, overhead press, rows, and pull-ups. Integrates accessory isolation work for lagging body parts with neural drive optimization.',
    price: 0,
    experienceLevel: 'Intermediate',
    bodybuildingStage: 'Bulking',
    durationWeeks: 8,
    locationContext: 'Gym / Commercial Facility',
    coverImageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    tier: 'TIER 01',
    efficiency: 89.5,
    burnRate: 520,
    ratingAverage: 4.5,
    reviewsCount: 1200,
    isFeatured: false,
    createdBy: SYSTEM_CREATOR_ID,
  },
  {
    title: 'Metabolic Fire Engine',
    shortDescription: 'Circuit-based metabolic conditioning designed to maximize caloric expenditure during cutting phases.',
    fullDescription: 'Circuit-based metabolic conditioning designed to maximize caloric expenditure during cutting phases. Combines resistance training with high-intensity intervals to preserve lean mass while accelerating fat oxidation. Includes heart rate zone targets and rest period protocols for optimal thermogenic response.',
    price: 0,
    experienceLevel: 'Beginner',
    bodybuildingStage: 'Cutting',
    durationWeeks: 6,
    locationContext: 'Home / Minimal Equipment',
    coverImageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    tier: 'TIER 02',
    efficiency: 85.0,
    burnRate: 680,
    ratingAverage: 4.3,
    reviewsCount: 890,
    isFeatured: false,
    createdBy: SYSTEM_CREATOR_ID,
  },
  {
    title: 'Lower Chassis Absolute Strength',
    shortDescription: 'Squat and deadlift focused lower body protocol for raw strength and power development.',
    fullDescription: 'Squat and deadlift focused lower body protocol for raw strength and power development. Utilizes conjugate-style periodization with max effort, dynamic effort, and repetition effort days. Accessory work targets posterior chain weaknesses and hip mobility for optimal force production.',
    price: 19.99,
    experienceLevel: 'Advanced',
    bodybuildingStage: 'Bulking',
    durationWeeks: 10,
    locationContext: 'Gym / Commercial Facility',
    coverImageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
    tier: 'TIER 03',
    efficiency: 94.1,
    burnRate: 610,
    ratingAverage: 4.7,
    reviewsCount: 2400,
    isFeatured: false,
    createdBy: SYSTEM_CREATOR_ID,
  },
  {
    title: 'Neuromuscular Base Balance',
    shortDescription: 'Balanced full-body routine emphasizing neuromuscular connections and stabilizer muscle activation.',
    fullDescription: 'A balanced full-body routine emphasizing neuromuscular connections and stabilizer muscles. Perfect for beginners building foundational movement patterns. Focuses on mind-muscle connection, tempo control, and progressive range of motion improvements across all major muscle groups.',
    price: 0,
    experienceLevel: 'Beginner',
    bodybuildingStage: 'Recomposition',
    durationWeeks: 4,
    locationContext: 'Home / Minimal Equipment',
    coverImageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
    tier: 'TIER 01',
    efficiency: 78.3,
    burnRate: 350,
    ratingAverage: 4.1,
    reviewsCount: 450,
    isFeatured: false,
    createdBy: SYSTEM_CREATOR_ID,
  },
  {
    title: 'Core Reactor Ignition Sequence',
    shortDescription: 'Targeted core training protocol developing strength through anti-rotation and bracing patterns.',
    fullDescription: 'Targeted core training protocol that develops strength through anti-rotation and bracing patterns. Includes Pallof press variations, loaded carries, and hanging leg raise progressions. Designed to build a bulletproof midsection that transfers power efficiently across all compound lifts.',
    price: 0,
    experienceLevel: 'Intermediate',
    bodybuildingStage: 'Cutting',
    durationWeeks: 6,
    locationContext: 'Gym / Commercial Facility',
    coverImageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    tier: 'TIER 02',
    efficiency: 87.6,
    burnRate: 450,
    ratingAverage: 4.4,
    reviewsCount: 980,
    isFeatured: false,
    createdBy: SYSTEM_CREATOR_ID,
  },
  {
    title: 'Push-Pull Neural Override',
    shortDescription: 'Advanced push-pull split optimized with neural drive techniques for competitive strength athletes.',
    fullDescription: 'An advanced push-pull split optimized with neural drive techniques for strength athletes. Incorporates cluster sets, rest-pause methods, and accommodating resistance through bands and chains. Autoregulated RPE-based loading ensures optimal daily performance without burnout.',
    price: 14.99,
    experienceLevel: 'Advanced',
    bodybuildingStage: 'Bulking',
    durationWeeks: 8,
    locationContext: 'Gym / Commercial Facility',
    coverImageUrl: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=600&q=80',
    tier: 'TIER 01',
    efficiency: 92.4,
    burnRate: 580,
    ratingAverage: 4.6,
    reviewsCount: 1800,
    isFeatured: false,
    createdBy: SYSTEM_CREATOR_ID,
  },
  {
    title: 'Endurance Flux Capacitor',
    shortDescription: 'High-rep moderate-load protocol engineered for muscular endurance during body recomposition phases.',
    fullDescription: 'High-rep, moderate-load protocol designed for muscular endurance during recomposition phases. Emphasizes time under tension with controlled eccentrics and peak squeeze holds. Perfect for athletes transitioning between training blocks or recovering from high-intensity phases.',
    price: 0,
    experienceLevel: 'Beginner',
    bodybuildingStage: 'Recomposition',
    durationWeeks: 4,
    locationContext: 'Home / Minimal Equipment',
    coverImageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80',
    tier: 'TIER 03',
    efficiency: 75.8,
    burnRate: 390,
    ratingAverage: 4.0,
    reviewsCount: 620,
    isFeatured: false,
    createdBy: SYSTEM_CREATOR_ID,
  },
  {
    title: 'Shoulder Siege Protocol',
    shortDescription: 'Deltoid isolation and compound pressing protocol engineered for boulder shoulder development.',
    fullDescription: 'Deltoid isolation and compound pressing protocol for boulder shoulder development. Progresses from heavy overhead presses to targeted lateral raise variations. Includes rear delt prioritization for shoulder health and aesthetic balance across all three deltoid heads.',
    price: 0,
    experienceLevel: 'Intermediate',
    bodybuildingStage: 'Bulking',
    durationWeeks: 6,
    locationContext: 'Gym / Commercial Facility',
    coverImageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    tier: 'TIER 02',
    efficiency: 86.1,
    burnRate: 490,
    ratingAverage: 4.2,
    reviewsCount: 750,
    isFeatured: false,
    createdBy: SYSTEM_CREATOR_ID,
  },
  {
    title: 'Thermogenic Shred Matrix',
    shortDescription: 'HIIT-infused resistance training designed to maximize fat oxidation while preserving lean muscle mass.',
    fullDescription: 'HIIT-infused resistance training designed to maximize fat oxidation while preserving lean mass. Alternates between compound supersets and cardio bursts for elevated EPOC (excess post-exercise oxygen consumption). Caloric expenditure targets are tracked per session with built-in deload protocols.',
    price: 9.99,
    experienceLevel: 'Intermediate',
    bodybuildingStage: 'Cutting',
    durationWeeks: 8,
    locationContext: 'Gym / Commercial Facility',
    coverImageUrl: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&q=80',
    tier: 'TIER 01',
    efficiency: 91.3,
    burnRate: 720,
    ratingAverage: 4.5,
    reviewsCount: 1350,
    isFeatured: false,
    createdBy: SYSTEM_CREATOR_ID,
  },
  {
    title: 'Functional Mobility Reboot',
    shortDescription: 'Active recovery and mobility-focused session for joint health and flexibility restoration.',
    fullDescription: 'Active recovery and mobility-focused session for joint health and flexibility restoration. Uses dynamic stretching, foam rolling protocols, and loaded mobility drills to improve range of motion. Ideal for rest days or as a supplement to high-intensity training blocks.',
    price: 0,
    experienceLevel: 'Beginner',
    bodybuildingStage: 'Recomposition',
    durationWeeks: 4,
    locationContext: 'Home / Minimal Equipment',
    coverImageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    tier: 'TIER 03',
    efficiency: 70.2,
    burnRate: 200,
    ratingAverage: 3.9,
    reviewsCount: 320,
    isFeatured: false,
    createdBy: SYSTEM_CREATOR_ID,
  },
  {
    title: 'Posterior Chain Overload',
    shortDescription: 'Glute and hamstring-dominant training protocol with progressive overload for posterior development.',
    fullDescription: 'Glute and hamstring-dominant training protocol with progressive overload principles. Incorporates Romanian deadlifts, hip thrusts, and Nordic curls with specific tempo prescriptions. Designed for athletes seeking to balance quad-dominant training patterns and improve athletic performance.',
    price: 0,
    experienceLevel: 'Advanced',
    bodybuildingStage: 'Bulking',
    durationWeeks: 10,
    locationContext: 'Gym / Commercial Facility',
    coverImageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80',
    tier: 'TIER 01',
    efficiency: 95.7,
    burnRate: 560,
    ratingAverage: 4.8,
    reviewsCount: 2100,
    isFeatured: false,
    createdBy: SYSTEM_CREATOR_ID,
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;

    if (!mongoUri || !dbName) {
      throw new Error('MONGO_URI or DB_NAME is not defined');
    }

    await mongoose.connect(mongoUri, { dbName });
    console.log('Connected to MongoDB for seeding...');

    // Clear existing routines
    await Routine.deleteMany({});
    console.log('Cleared existing routines.');

    // Insert seed data
    const inserted = await Routine.insertMany(seedRoutines);
    console.log(`Seeded ${inserted.length} routines successfully!`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();
