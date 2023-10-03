import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./userSlice";
import messageReducer from "./messageSlice";
// Store
const store = configureStore({
  reducer: {
    auth: authReducer,
    task: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
