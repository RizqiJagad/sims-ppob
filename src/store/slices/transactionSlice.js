import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const topUp = createAsyncThunk(
    'transaction/topUp',
    async (amount, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/topup', { top_up_amount: amount });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const postTransaction = createAsyncThunk(
    'transaction/postTransaction',
    async (serviceCode, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/transaction', { service_code: serviceCode });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getHistory = createAsyncThunk(
    'transaction/getHistory',
    async ({ limit, offset }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/transaction/history?limit=${limit}&offset=${offset}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        history: [],
        status: 'idle',
        error: null,
        message: null,
    },
    reducers: {
        resetTransactionState: (state) => {
            state.status = 'idle';
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(topUp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(topUp.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload.message;
            })
            .addCase(topUp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Top Up failed';
            })
            .addCase(postTransaction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postTransaction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload.message;
            })
            .addCase(postTransaction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Transaction failed';
            })
            .addCase(getHistory.fulfilled, (state, action) => {
                if (action.meta.arg.offset === 0) {
                    state.history = action.payload.data.records;
                } else {
                    state.history = [...state.history, ...action.payload.data.records];
                }
            });
    },
});

export const { resetTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;
