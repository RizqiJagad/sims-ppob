import { describe, it, expect, vi } from 'vitest';
import profileReducer, { getProfile, updateProfile } from './profileSlice';

// Mock async thunks partially if needed, but for reducer logic we test state changes primarily
// Testing reducers handling actions

describe('profileSlice', () => {
    const initialState = {
        data: null,
        status: 'idle',
        error: null,
    };

    it('should return initial state', () => {
        expect(profileReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should set loading when getProfile is pending', () => {
        const nextState = profileReducer(initialState, { type: getProfile.pending.type });
        expect(nextState.status).toBe('loading');
    });

    it('should set data when getProfile is fulfilled', () => {
        const payload = { data: { email: 'test@example.com', first_name: 'Test' } };
        const nextState = profileReducer(initialState, { type: getProfile.fulfilled.type, payload });
        expect(nextState.status).toBe('succeeded');
        expect(nextState.data).toEqual(payload.data);
    });

    it('should set error when getProfile is rejected', () => {
        const payload = { message: 'Network error' };
        const nextState = profileReducer(initialState, { type: getProfile.rejected.type, payload });
        expect(nextState.status).toBe('failed');
        expect(nextState.error).toBe('Network error');
    });

    it('should update data when updateProfile is fulfilled', () => {
        const payload = { data: { email: 'updated@example.com' } };
        const nextState = profileReducer(initialState, { type: updateProfile.fulfilled.type, payload });
        expect(nextState.status).toBe('succeeded');
        expect(nextState.data).toEqual(payload.data);
    });
});
