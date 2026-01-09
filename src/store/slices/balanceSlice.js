import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const getBalance = createAsyncThunk(
    'balance/getBalance',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/balance');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const balanceSlice = createSlice({
    name: 'balance',
    initialState: {
        balance: 0,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBalance.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getBalance.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.balance = action.payload.data.balance;
            })
            .addCase(getBalance.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch balance';
            });
    },
});

export default balanceSlice.reducer;
