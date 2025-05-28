import { configureStore } from '@reduxjs/toolkit';
import userModalSlice from './userModalSlice';
import authSlice from './authSlice';
import projectSlice from "./projectSlice";
import serviceSlice from "./serviceSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: userModalSlice,
    projects: projectSlice,
    services: serviceSlice
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
