import {
  checkAuthentication,
  clearSession,
  getUserToken,
} from '@/common/utils/general';

import { createSlice } from '@reduxjs/toolkit';

interface AuthInterface {
  isLoggedIn: boolean;
  userToken: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: checkAuthentication(),
    userToken: getUserToken(),
  },
  reducers: {
    login (state: AuthInterface, payload: any) {
      state.isLoggedIn = true;
      state.userToken = payload;
    },
    logout (state) {
      state.isLoggedIn = false;
      state.userToken = null;

      clearSession();
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
