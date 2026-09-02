import express, { Application, Request, Response } from 'express';
import { cardRoutes } from './routes/card.routes';
import { errorHandler } from './middleware/errorHandler';

export const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic health check
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Card Validation API is running.' });
});

// Register routes
app.use('/api', cardRoutes);

// Global error handler — must be registered last
app.use(errorHandler);
