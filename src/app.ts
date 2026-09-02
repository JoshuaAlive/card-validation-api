import express, { Application } from 'express';
import { cardRoutes } from './routes/card.routes';

export const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
    res.json({ message: 'Card Validation API is running.' });
});

// Register routes
app.use('/api', cardRoutes);
