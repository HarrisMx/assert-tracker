import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userState/userSlice';
import appReducer from './appState/appSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer
  },
})