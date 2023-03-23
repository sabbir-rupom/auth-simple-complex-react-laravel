import { configureStore } from '@reduxjs/toolkit';

import authSlice from '@/features/auth/store/auth.slice';
import itemSlice from '@/features/simple/store/item.slice';

const store = configureStore({
  reducer: {
    userAuth: authSlice.reducer,
    item: itemSlice.reducer,
  },
});

export default store;
