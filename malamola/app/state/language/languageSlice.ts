// imports ------------------------------------------------------------------------
import { createSlice } from "@reduxjs/toolkit"; // redux toolkit inbuilt functions

// types --------------------------------------------------------------------------
interface LanguageState {
  current: "en" | "zh"; // english or zhongwen
}

// initial state ------------------------------------------------------------------
const initialState: LanguageState = {
  current: "en", // default as english
};

// slices -------------------------------------------------------------------------
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      // toggle language between english and chinese
      // NOTE: this is a synchronous action, and it is by right an immutable update but redux toolkit handles this for us so we can write it like it is mutable
      state.current = state.current === "en" ? "zh" : "en";
    },
  },
});

// exports ------------------------------------------------------------------------
export const { toggleLanguage } = languageSlice.actions;

export default languageSlice.reducer;
