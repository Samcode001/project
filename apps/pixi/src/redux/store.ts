import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./socket/socketSlice";

export const store = configureStore({
  reducer: {
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ← disable serializable warnings
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
