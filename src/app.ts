import cors from 'cors';
import express, { Application } from 'express';
import { userRoutes } from './app/routes/user.route';
import { authRoutes } from './app/routes/auth.route';
import { destinationRoutes } from './app/routes/destination.route';
import { universityRoutes } from './app/routes/university.route';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// routing
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/destination', destinationRoutes);
app.use('/api/v1/university', universityRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '🎉 Welcome to Study Abroad API!',
  });
});

export default app;
