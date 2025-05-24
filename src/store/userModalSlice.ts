import { createSlice } from '@reduxjs/toolkit';

const initData = {
  name: "",
  email: "",
  password: "",
  img: "",
  avatar: ""
}

export const slice = createSlice({
  name: 'modal',
  initialState: {
    show1: false,
    show2: false,
    data: initData
  },
  reducers: {
    showModalSlice: (state) => {
      state.show1 = true
    },
    closeModalSlice: (state) => {
      state.show1 = false
      state.show2 = false
      state.data = initData
    },
    showLoginModal: (state) => {
      state.show2 = true
    }
  },
});

export const { showModalSlice, closeModalSlice, showLoginModal } = slice.actions;
export default slice.reducer;
