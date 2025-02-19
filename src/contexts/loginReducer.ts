import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AuthService from "../services/auth/authService"
import { LoginRequest, UserResponse } from "models/auth/authModel"

interface AuthState {
  user: UserResponse | null
  loading: boolean
  error: string | null
}

// ✅ Instead of storing the token, we store the user info
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
}

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  return await AuthService.checkAuth()
})

// ✅ Login action (no need to store token)
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginRequest, { dispatch, rejectWithValue }) => {
    try {
      await AuthService.login(payload)
      dispatch(loadUser())
    } catch (error: any) {
      return rejectWithValue("Invalid username or password")
    }
  }
)

export const logoutUser = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  await AuthService.logout()
  dispatch(logout())
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
