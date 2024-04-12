// imports ------------------------------------------------------------------------
import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./language/languageSlice";

// Create store with reducers -----------------------------------------------------
export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});

// Define types for RootState and AppDispatch for use in hooks --------------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
