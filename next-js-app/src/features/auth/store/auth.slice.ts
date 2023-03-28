import {
  checkAuthentication,
  clearSession,
  getUserToken,
} from '@/features/auth/services/AuthService';
import { saveUserToken } from './../services/AuthService';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthInterface {
  isLoggedIn: boolean;
  userToken: string | null;
}

const initialState: AuthInterface = {
  isLoggedIn: checkAuthentication(),
  userToken: getUserToken(),
};

// const checkLogin = createAction('CHECK_LOGIN');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login (state: AuthInterface, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.userToken = action.payload;
      saveUserToken(action.payload);
    },
    logout (state) {
      state.isLoggedIn = false;
      state.userToken = null;

      clearSession();
    },
  },

  // extraReducers: builder => {
  //   // Set loading parameter to true if item list not fetched yet
  //   builder.addCase(checkLogin, state => {
  //     console.log(checkAuthentication(), getUserToken());
  //     state.isLoggedIn = checkAuthentication();
  //     state.userToken = getUserToken();
  //   });
  // },
});

export const authActions = authSlice.actions;

export default authSlice;
