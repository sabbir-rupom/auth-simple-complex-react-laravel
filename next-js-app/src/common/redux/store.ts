import { configureStore } from '@reduxjs/toolkit';

import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import authSlice from '@/features/auth/store/auth.slice';
import orderSlice from '@/features/complex/store/order.slice';
import itemSlice from '@/features/simple/store/item.slice';
import toastSlice from './toast.slice';

const store = configureStore({
  reducer: {
    userAuth: authSlice.reducer,
    item: itemSlice.reducer,
    order: orderSlice.reducer,
    toast: toastSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
