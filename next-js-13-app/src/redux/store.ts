import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import toastSlice from './features/toast.slice';
import itemSlice from './features/item.slice';
import orderSlice from './features/order.slice';

export const store = configureStore({
  reducer: {
    toast: toastSlice.reducer,
    item: itemSlice.reducer,
    order: orderSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
