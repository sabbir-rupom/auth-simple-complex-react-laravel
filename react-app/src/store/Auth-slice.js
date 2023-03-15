import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem('userToken'),
    userToken: localStorage.getItem('userToken')
  },
  reducers: {
    login (state, payload) {
      state.isLoggedIn = true
      state.userToken = payload
    },
    logout (state) {
      state.isLoggedIn = false
      state.userToken = null
    }
  }
})

export const authActions = authSlice.actions

export default authSlice
