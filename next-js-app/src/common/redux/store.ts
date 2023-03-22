import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/AuthSlice';

const store = configureStore({
  reducer: {
    userAuth: authSlice.reducer,
  },
});

export default store;
