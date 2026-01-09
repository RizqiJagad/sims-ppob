import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const getBanners = createAsyncThunk(
    'banners/getBanners',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/banner');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const bannerSlice = createSlice({
    name: 'banners',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBanners.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getBanners.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload.data;
            })
            .addCase(getBanners.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch banners';
            });
    },
});

export default bannerSlice.reducer;
