import { describe, it, expect } from 'vitest';
import balanceReducer, { getBalance } from './balanceSlice';

describe('balanceSlice', () => {
    const initialState = {
        balance: 0,
        status: 'idle',
        error: null,
    };

    it('should return initial state', () => {
        expect(balanceReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should set loading when getBalance is pending', () => {
        const nextState = balanceReducer(initialState, { type: getBalance.pending.type });
        expect(nextState.status).toBe('loading');
    });

    it('should update balance when getBalance is fulfilled', () => {
        const payload = { data: { balance: 50000 } };
        const nextState = balanceReducer(initialState, { type: getBalance.fulfilled.type, payload });
        expect(nextState.status).toBe('succeeded');
        expect(nextState.balance).toBe(50000);
    });

    it('should set error when getBalance is rejected', () => {
        const payload = { message: 'Failed to fetch' };
        const nextState = balanceReducer(initialState, { type: getBalance.rejected.type, payload });
        expect(nextState.status).toBe('failed');
        expect(nextState.error).toBe('Failed to fetch');
    });
});
