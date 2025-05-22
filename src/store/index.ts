import { configureStore } from '@reduxjs/toolkit';
import userModalSlice from './userModalSlice';
import authSlice from './authSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    userModal: userModalSlice
  },
});
