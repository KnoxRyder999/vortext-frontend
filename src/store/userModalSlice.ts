import { createSlice } from '@reduxjs/toolkit';

const initData = {
    name: "",
    email: "",
    password: "",
    img: "",
    avatar: ""
  }

export const userModalSlice = createSlice({
  name: 'userModal',
  initialState: {
    show: false,
    data: initData
  },
  reducers: {
    showModalSlice: (state, action) => {
        state.show = true
        state.data = initData
    },
    closeModalSlice: (state, action) => {
        state.show = false
    },
    userDataSlice: (state, { payload }) => {
        state.data = {...state.data, ...payload}
    },
  },
});

export const { showModalSlice, closeModalSlice, userDataSlice } = userModalSlice.actions;
export default userModalSlice.reducer;
