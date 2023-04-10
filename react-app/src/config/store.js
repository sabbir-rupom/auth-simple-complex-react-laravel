import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // userAuth: authSlice.reducer,
    // item: itemSlice.reducer,
    // order: orderSlice.reducer,
    // toast: toastSlice.reducer,
  }
});

export default store;
