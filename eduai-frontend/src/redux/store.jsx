// src/redux/store.jsimport { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Configure Redux store with auth reducer
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
