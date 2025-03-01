import Login from "components/auth/login/Login"
import Dashboard from "components/admin/dashboard/Dashboard"
import StudentPage from "components/admin/dashboard/content/student/Student"
import CoursePage from "components/admin/dashboard/content/course/Course"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "components/auth/ProtectedRoute"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "contexts/loginReducer"
import { useEffect } from "react"
import { AppDispatch, RootState } from "utils/store"

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.auth.token)
  const rehydrated = useSelector((state: RootState) => state.auth._persist?.rehydrated)

  useEffect(() => {
    if (rehydrated) {
      if (token) {
        dispatch(loadUser(token))
      }
    }
  }, [rehydrated, token, dispatch])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="ADMIN" redirectPath="/">
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="student" element={<StudentPage />} />
          <Route path="course" element={<CoursePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
