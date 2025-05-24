import { configureStore } from '@reduxjs/toolkit';
import userModalSlice from './userModalSlice';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: userModalSlice
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
