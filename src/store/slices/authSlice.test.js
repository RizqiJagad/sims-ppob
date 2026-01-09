import { describe, it, expect, beforeEach, vi } from 'vitest';
import authReducer, { logout, clearMessages } from './authSlice';

describe('authSlice', () => {
    const initialState = {
        token: null,
        status: 'idle',
        error: null,
        message: null,
    };

    beforeEach(() => {
        vi.stubGlobal('localStorage', {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
        });
    });

    it('should handle initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual({
            token: null,
            status: 'idle',
            error: null,
            message: null,
        });
    });

    it('should handle logout', () => {
        const state = { ...initialState, token: 'fake-token' };
        const nextState = authReducer(state, logout());
        expect(nextState.token).toBeNull();
        expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });

    it('should handle clearMessages', () => {
        const state = { ...initialState, error: 'error', message: 'success' };
        const nextState = authReducer(state, clearMessages());
        expect(nextState.error).toBeNull();
        expect(nextState.message).toBeNull();
    });
});
