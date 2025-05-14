import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { STUDENT } from "student/constants/studentColumns"
import { BASE, ID } from "student/constants/studentMappings"
import studentService from "student/services/studentService"

interface StudentState {
  identity: string | undefined
  loading: boolean
}

const initialState: StudentState = {
  identity: undefined,
  loading: false
}

export const loadIdentity = createAsyncThunk(BASE + ID, async (username: string, { rejectWithValue }) => {
  try {
    return await studentService.getIdentityByUsername(username)
  } catch (error) {
    return rejectWithValue("Unauthorized")
  }
})

const studentSlice = createSlice({
  name: STUDENT,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadIdentity.fulfilled, (state, action) => {
      state.identity = action.payload
    })
  }
})
export default studentSlice.reducer
