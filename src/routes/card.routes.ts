import { Router } from 'express';
import { CardController } from '../controllers/card.controller';

const cardController = new CardController();

export const cardRoutes = Router();

// POST /api/validate
cardRoutes.post('/validate', cardController.validateCard);
