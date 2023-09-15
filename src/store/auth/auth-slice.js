import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    auth: {
      user: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.auth.user = action.payload;
    },
    removeUser: (state, _) => {
      state.auth.user = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUser, removeUser } = authSlice.actions;
