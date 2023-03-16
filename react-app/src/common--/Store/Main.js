import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Auth-slice'

const Store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
})

export default Store
