import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'modal',
  initialState: {
    show1: false,
    show2: false,
  },
  reducers: {
    showModalSlice: (state) => {
      state.show1 = true
    },
    closeModalSlice: (state) => {
      state.show1 = false
      state.show2 = false
    },
    showLoginModal: (state) => {
      state.show2 = true
    }
  },
});

export const { showModalSlice, closeModalSlice, showLoginModal } = slice.actions;
export default slice.reducer;
