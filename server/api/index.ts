import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import routes
import authRoutes from '../src/routes/auth.routes';
import userRoutes from '../src/routes/user.routes';
import patientRoutes from '../src/routes/patient.routes';
import appointmentRoutes from '../src/routes/appointment.routes';
import prescriptionRoutes from '../src/routes/prescription.routes';
import billingRoutes from '../src/routes/billing.routes';
import analyticsRoutes from '../src/routes/analytics.routes';
import settingsRoutes from '../src/routes/settings.routes';
import backupRoutes from '../src/routes/backup.routes';
import serviceRoutes from '../src/routes/service.routes';
import setupRoutes from '../src/routes/setup.routes';

// Import middleware and utilities
import { errorHandler } from '../src/middleware/errorHandler';
import { connectDB } from '../src/config/database';

dotenv.config();

const app = express();

// Trust proxy for Vercel deployment
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://prime-skin-clinic.vercel.app',
    'https://prime-skin-clinic-frontend.vercel.app',
    /\.vercel\.app$/,
    /\.onrender\.com$/
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 200, // Limit each IP to 200 requests per minute
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.get('/', (req, res) => {
  res.send('Prime Skin Clinic API - Running on Vercel');
});

// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/backups', backupRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/setup', setupRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to database
connectDB().catch((error) => {
  console.error('Failed to connect to database:', error);
});

export default app;
