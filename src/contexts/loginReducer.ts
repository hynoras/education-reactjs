import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AuthService from "../services/auth/authService"
import { setAuthToken } from "utils/api"
import { LoginRequest, UserResponse } from "models/auth/authModel"

interface AuthState {
  user: UserResponse | null
  token: string | null
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false
}

export const loginUser = createAsyncThunk("auth/login", async (payload: LoginRequest, { rejectWithValue }) => {
  try {
    const token = await AuthService.login(payload)
    setAuthToken(token)
    return token
  } catch (error) {
    return rejectWithValue("Invalid username or password")
  }
})

export const loadUser = createAsyncThunk("auth/loadUser", async (token: string, { rejectWithValue }) => {
  setAuthToken(token)
  try {
    return await AuthService.checkAuth(token)
  } catch (error) {
    return rejectWithValue("Unauthorized")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      setAuthToken(null)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload
    })
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})
export const { logout } = authSlice.actions
export default authSlice.reducer
