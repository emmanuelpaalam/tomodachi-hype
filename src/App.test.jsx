import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App.jsx';

jest.mock('./countdown.js', () => ({
    getCountdown: () => 100, // mock countdown to always return 100 days
}));
jest.mock('./firebase.js', () => ({
    db: {}, // dummy db object to prevent crashing
}));
jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    onSnapshot: jest.fn((docRef, callback) => {
        callback({
            exists: true,
            data: () => ({ hype: 42 })    
        });
        return jest.fn(); // dummy unsubscribe function
    })
}));
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ status: "Hype added!" }),
    })
);

describe('App Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders countdown and hype level correctly', async () => {
        render(<App />);
        expect(screen.getByText('Tomodachi Life Countdown')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('42')).toBeInTheDocument();
    });

    test('increments hype level on button click', async () => {
        render(<App />);
        const button = screen.getByText('🚂 Choo Choo! (Add Hype)');
        fireEvent.click(button);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/addHype')
            )
        });
    });
});