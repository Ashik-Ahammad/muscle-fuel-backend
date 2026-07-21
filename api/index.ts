import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../src/config/db.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '../src/auth.js';
import routineRoutes from '../src/routes/routineRoutes.js';
import movementRoutes from '../src/routes/movementRoutes.js';
import planRoutes from '../src/routes/planRoutes.js';
import manageRoutes from '../src/routes/manageRoutes.js';
import aiRoutes from '../src/routes/aiRoutes.js';
import profileRoutes from '../src/routes/profileRoutes.js';
import { requireAuth } from '../src/middlewares/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Mongoose database
connectDB();

// 1. Configure CORS to allow frontend communication with credentials
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// 2. Mount the Better Auth node handler.
// Must be done BEFORE express.json() to prevent hanging requests.
// Express v5 syntax requires {*any} for wildcard catch-alls.
app.all('/api/auth/{*any}', toNodeHandler(auth));

// 3. Mount JSON body parser for all other application routes
app.use(express.json());

// 4. API Routes
app.use('/api/routines', routineRoutes); // Public
app.use('/api/movements', movementRoutes); // Public

// Protected Routes
app.use('/api/plans', requireAuth, planRoutes);
app.use('/api/manage', requireAuth, manageRoutes);
app.use('/api/ai', requireAuth, aiRoutes);
app.use('/api/profile', requireAuth, profileRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'muscle-fuel-api' });
});

// Start the server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;