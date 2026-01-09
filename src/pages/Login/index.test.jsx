import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from './index';
import authReducer from '../../store/slices/authSlice';

// Mock store setup
const createMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authReducer,
        },
        preloadedState: initialState,
    });
};

describe('LoginPage Component', () => {
    it('renders login form correctly', () => {
        const store = createMockStore({
            auth: { status: 'idle', error: null },
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByPlaceholderText('masukkan email anda')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('masukkan password anda')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /masuk/i })).toBeInTheDocument();
    });

    it('updates input fields on user type', () => {
        const store = createMockStore({
            auth: { status: 'idle', error: null },
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        const emailInput = screen.getByPlaceholderText('masukkan email anda');
        const passwordInput = screen.getByPlaceholderText('masukkan password anda');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });
});
