import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { STUDENT } from "student/constants/studentConstants"
import studentService from "student/services/studentService"

interface StudentState {
  studentId: string | undefined
  loading: boolean
}

const initialState: StudentState = {
  studentId: undefined,
  loading: false
}

export const loadStudentId = createAsyncThunk(
  STUDENT.ROUTE.API.BASE + STUDENT.ROUTE.API.ID,
  async (username: string, { rejectWithValue }) => {
    try {
      return await studentService.getStudentIdByUsername(username)
    } catch (error) {
      return rejectWithValue("Unauthorized")
    }
  }
)

const studentSlice = createSlice({
  name: STUDENT.KEY.GENERIC.STUDENT,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadStudentId.fulfilled, (state, action) => {
      state.studentId = action.payload
    })
  }
})
export default studentSlice.reducer
