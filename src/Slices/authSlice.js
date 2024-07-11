import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  signupData: null,
  loading: false,
  isAuthorized: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setIsAuthorized(state, value) {
      state.isAuthorized = value.payload;
    },
    setUser(state, value) {
      state.user = value.payload;
    },
  },
});

export const { setToken, setLoading, setUser, setIsAuthorized, setSignupData } =
  authSlice.actions;
export default authSlice.reducer;
