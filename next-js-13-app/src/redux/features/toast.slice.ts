import { AlertColor } from '@/config/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastInterface {
  isOpen?: boolean;
  message: string;
  summary: string;
  type: AlertColor;
}

const initialState: ToastInterface = {
  isOpen: false,
  message: '',
  summary: '',
  type: 'info',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast (state: ToastInterface, action: PayloadAction<ToastInterface>) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type ?? 'info';
      state.summary = action.payload.summary ?? 'Message';
    },
    hideToast (state) {
      state.isOpen = false;
      state.message = state.summary = '';
    },
  },
});

export const toastActions = toastSlice.actions;

export default toastSlice;
