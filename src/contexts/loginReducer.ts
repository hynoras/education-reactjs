import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AuthService from "../services/auth/authService"
import { LoginRequest, LoginResponse } from "models/auth/authModel"

interface AuthState {
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null
}

export const loginUser = createAsyncThunk("auth/login", async (payload: LoginRequest, { rejectWithValue }) => {
  try {
    const response: LoginResponse = await AuthService.login(payload)
    localStorage.setItem("token", response.token)
    return response
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      localStorage.removeItem("token")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
