import Login from "components/features/auth/login/Login"
import AdminMainPage from "components/shared/main/admin/AdminMain"
import StudentPage from "components/features/student/list/StudentList"
import CoursePage from "components/features/course/Course"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "components/features/auth/ProtectedRoute"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "contexts/loginReducer"
import { useEffect } from "react"
import { AppDispatch, RootState } from "utils/store"
import StudentDetailPage from "components/features/student/detail/view/StudentDetailView"
import StudentDetailEditPage from "components/features/student/detail/edit/StudentDetailEdit"

const App: React.FC = () => {
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
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="ADMIN" redirectPath="/">
              <AdminMainPage />
            </ProtectedRoute>
          }
        >
          <Route path="student/" element={<StudentPage />} />
          <Route path="student/:studentId/view" element={<StudentDetailPage />} />
          <Route path="student/:studentId/edit" element={<StudentDetailEditPage />} />
          <Route path="course" element={<CoursePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
