import { isValidLuhn } from '../utils/luhn';

export class CardValidationService {
    /**
     * Processes the card number and returns true if it is valid.
     */
    public validate(cardNumber: string): boolean {
        return isValidLuhn(cardNumber);
    }
}
