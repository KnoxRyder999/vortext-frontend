import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'bank',
  initialState: {
    show: false,
    url: '',
  },
  reducers: {
    showBankModalSlice: (state, { payload }) => {
      state.show = true
      state.url = payload
    },
    closeBankModalSlice: (state) => {
      state.show = false
      state.url = ""
    }
  },
});

export const { showBankModalSlice, closeBankModalSlice } = slice.actions;
export default slice.reducer;
