import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastInterface {
  isOpen?: boolean;
  message: string;
  type: AlertColor;
}

const initialState: ToastInterface = {
  isOpen: false,
  message: '',
  type: 'info',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast (state: ToastInterface, action: PayloadAction<ToastInterface>) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideToast (state) {
      state.isOpen = false;
      state.message = '';
    },
  },
});

export const toastActions = toastSlice.actions;

export default toastSlice;
