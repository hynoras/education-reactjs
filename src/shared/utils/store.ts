import { configureStore } from "@reduxjs/toolkit"
import authReducer from "auth/contexts/loginReducer"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import studentReducer from "student/contexts/studentReducer"

const authPersistConfig = {
  key: "auth",
  storage
}

const studentPersistConfig = {
  key: "student",
  storage
}

const persistAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistStudentReducer = persistReducer(studentPersistConfig, studentReducer)

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    student: persistStudentReducer
  }
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
