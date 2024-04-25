import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  token: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  intialState,
  reducers: {
    login: (state, action) => {
      (state.token = action.payload.token),
        (state.userData = action.payload.userData);
      console.log("state: authslice: ", action);
      console.log("state: authslice: actionpayload ", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
