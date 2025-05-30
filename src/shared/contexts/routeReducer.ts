import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface RouteState {
  previousLocation: string | null
}

const initialState: RouteState = {
  previousLocation: null
}

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setPreviousLocation: (state, action: PayloadAction<string | null>) => {
      state.previousLocation = action.payload
    }
  }
})
export const { setPreviousLocation } = routeSlice.actions
export default routeSlice.reducer
