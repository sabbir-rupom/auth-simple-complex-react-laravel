import { configureStore } from '@reduxjs/toolkit';

import authSlice from '@/features/auth/store/AuthSlice';

const store = configureStore({
  reducer: {
    userAuth: authSlice.reducer,
  },
});

export default store;
