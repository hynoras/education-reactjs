import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import studentService from "student/services/student/studentService"

interface StudentState {
  identity: string | undefined
  loading: boolean
}

const initialState: StudentState = {
  identity: undefined,
  loading: false
}

export const loadIdentity = createAsyncThunk("student/identity", async (username: string, { rejectWithValue }) => {
  try {
    return await studentService.getIdentityByUsername(username)
  } catch (error) {
    return rejectWithValue("Unauthorized")
  }
})

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadIdentity.fulfilled, (state, action) => {
      state.identity = action.payload
    })
  }
})
export default studentSlice.reducer
