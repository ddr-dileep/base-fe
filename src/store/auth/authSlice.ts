import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/api.types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ access_token: string }>
    ) => {
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("token", action.payload.access_token);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, setUser, logout, setError, clearError } =
  authSlice.actions;
export default authSlice.reducer;
