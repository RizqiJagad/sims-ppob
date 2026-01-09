import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const getServices = createAsyncThunk(
    'services/getServices',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/services');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getServices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload.data;
            })
            .addCase(getServices.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch services';
            });
    },
});

export default serviceSlice.reducer;
