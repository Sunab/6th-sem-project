import { createSlice } from "@reduxjs/toolkit";

// Reducers
export const authSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      // state.message = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.message = action.payload;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFail: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      // state.message = action.payload;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },

    logoutFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updatePassRequest: (state) => {
      state.loading = true;
    },
    updatePassSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePassFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    verifyAccRequest: (state) => {
      state.loading = true;
    },
    verifyAccSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    verifyAccFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

// Exporting Actions
export const {
  loginRequest,
  loginSuccess,
  loginFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  clearErrors,
  clearMessage,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updatePassRequest,
  updatePassSuccess,
  updatePassFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  registerRequest,
  registerSuccess,
  registerFail,
  verifyAccRequest,
  verifyAccSuccess,
  verifyAccFail,
} = authSlice.actions;

// Exporting Reducers
export default authSlice.reducer;
