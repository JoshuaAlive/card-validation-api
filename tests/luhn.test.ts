import { isValidLuhn } from '../src/utils/luhn';

describe('Luhn Algorithm Validation', () => {
    it('should return true for a valid card number', () => {
        expect(isValidLuhn('4111111111111111')).toBe(true);
    });

    it('should return false for an invalid card number', () => {
        // Changed the last digit to make it invalid
        expect(isValidLuhn('5061151002469035431')).toBe(false);
    });

    it('should return false for an empty string', () => {
        expect(isValidLuhn('')).toBe(false);
    });

    it('should return false for strings with letters', () => {
        expect(isValidLuhn('506115abcd')).toBe(false);
    });
});
