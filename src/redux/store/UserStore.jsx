import { configureStore } from '@reduxjs/toolkit'
import credentialsSlice from '../reducer/user.slice'


export const Store = configureStore({
  reducer :{
    userCred:credentialsSlice
  }
})
