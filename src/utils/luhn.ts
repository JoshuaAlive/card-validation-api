/**
 * Validates a given credit card number using the Luhn algorithm.
 * 
 * @param cardNumber - The credit card number as a string.
 * @returns boolean indicating whether the card number is valid.
 */
export function isValidLuhn(cardNumber: string): boolean {
    const sanitizedNumber = cardNumber.replace(/[\s-]/g, '');

    if (!sanitizedNumber || !/^\d+$/.test(sanitizedNumber)) {
        return false;
    }

    let sum = 0;
    let isEvenPosition = false;

    for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedNumber.charAt(i), 10);

        if (isEvenPosition) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEvenPosition = !isEvenPosition;
    }

    return sum % 10 === 0;
}
