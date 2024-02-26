import { createSlice } from "@reduxjs/toolkit";
import {
  changePasswordAsync,
  loginThunk,
  logoutThunk,
  registerThunk,
  updateDisplayNameThunk,
  updateEmailThunk,
} from "./AuthThunk";

const initialState = {
  userId: null,
  email: null,
  name: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
  isModalOpen: false,
  successMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUser: (state, { payload }) => {
      state.userId = payload.userId;
      state.name = payload.name;
      state.email = payload.email;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.name = payload.displayName;
        state.email = payload.email;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(registerThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.name = payload.displayName;
        state.email = payload.email;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.userId = null;
        state.name = null;
        state.email = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logoutThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(updateDisplayNameThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDisplayNameThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.name = payload;
      })
      .addCase(updateDisplayNameThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(updateEmailThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmailThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.email = payload;
      })
      .addCase(updateEmailThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(changePasswordAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePasswordAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.successMessage = payload;
      })
      .addCase(changePasswordAsync.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const authReducer = authSlice.reducer;

export const { getCurrentUser, toggleModal } = authSlice.actions;
