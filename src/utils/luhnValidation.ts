/**
 * Validates a given credit card number using the Luhn algorithm.
 * 
 * @param cardNumber - The credit card number as a string.
 * @returns boolean indicating whether the card number is valid.
 */
export function isValidCardNumber(cardNumber: string): boolean {
    // 1. Remove all spaces and dashes from the input
    const sanitizedNumber = cardNumber.replace(/[\s-]/g, '');

    // 2. If it's empty, or contains letters/symbols, it's invalid immediately
    if (!sanitizedNumber || !/^\d+$/.test(sanitizedNumber)) {
        return false;
    }

    // 3. The Luhn Algorithm Implementation
    let sum = 0;
    let isEvenPosition = false;

    // Loop through the digits from right to left (end to beginning)
    for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedNumber.charAt(i), 10);

        // Every second digit (from the right) gets doubled
        if (isEvenPosition) {
            digit *= 2;
            
            // If doubling makes it 10 or larger, subtract 9
            if (digit > 9) {
                digit -= 9;
            }
        }

        // Add the digit to our running total
        sum += digit;
        
        // Flip the flag for the next digit in the loop
        isEvenPosition = !isEvenPosition;
    }

    // The card is valid if the total sum is perfectly divisible by 10
    return sum % 10 === 0;
}
