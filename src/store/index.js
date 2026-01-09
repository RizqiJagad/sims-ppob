import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import balanceReducer from './slices/balanceSlice';
import serviceReducer from './slices/serviceSlice';
import bannerReducer from './slices/bannerSlice';
import transactionReducer from './slices/transactionSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        balance: balanceReducer,
        services: serviceReducer,
        banners: bannerReducer,
        transaction: transactionReducer,
    },
});

export default store;
