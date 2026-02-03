import { getCountdown } from './countdown';

describe('getCountdown', () => {
    test('should return correct countdown for future date', () => {

        const mockCurrentDate = new Date('2024-04-10T00:00:00Z');
        const targetDate = new Date('2024-04-16T00:00:00Z');

        const daysRemaining = getCountdown(targetDate, mockCurrentDate);
        expect(daysRemaining).toBe(6);
    });

    test('should return zero for past date', () => {
        const mockCurrentDate = new Date('2024-04-17T00:00:00Z');
        const targetDate = new Date('2024-04-16T00:00:00Z');

        const daysRemaining = getCountdown(targetDate, mockCurrentDate);
        expect(daysRemaining).toBe(0);
    });

    test('should return zero for today\'s date', () => {
        const mockCurrentDate = new Date('2024-04-16T00:00:00Z');
        const targetDate = new Date('2024-04-16T00:00:00Z');

        const daysRemaining = getCountdown(targetDate, mockCurrentDate);
        expect(daysRemaining).toBe(0);
    });
});