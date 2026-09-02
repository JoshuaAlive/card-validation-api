import { Request, Response } from 'express';
import { CardValidationService } from '../services/card-validation.service';

const cardService = new CardValidationService();

export class CardController {
    /**
     * Handles the POST request to validate a card number.
     */
    public validateCard = (req: Request, res: Response): Response => {
        const { cardNumber } = req.body;

        // 1. Handle missing input
        if (cardNumber === undefined) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'cardNumber is required in the request body.'
            });
        }

        // 2. Ensure it is a string
        if (typeof cardNumber !== 'string') {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'cardNumber must be a string.'
            });
        }

        // 3. Run the validation logic via the service
        const isValid = cardService.validate(cardNumber);

        // 4. Return the result
        return res.status(200).json({
            valid: isValid
        });
    };
}
