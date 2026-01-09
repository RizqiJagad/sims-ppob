import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/login', credentials);
            const { token } = response.data.data;
            localStorage.setItem('token', token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const registration = createAsyncThunk(
    'auth/registration',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/registration', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        status: 'idle',
        error: null,
        message: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
        clearMessages: (state) => {
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.data.token;
                state.message = action.payload.message;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Login failed';
            })
            .addCase(registration.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload.message;
            })
            .addCase(registration.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Registration failed';
            });
    },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;
