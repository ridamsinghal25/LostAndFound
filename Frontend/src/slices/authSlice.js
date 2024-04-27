import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");
const storedUserData = localStorage.getItem("userData");

const initialState = {
  token: storedToken ? storedToken : null,
  userData: storedUserData ? JSON.parse(storedUserData) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
      localStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
