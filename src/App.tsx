import Login from "auth/components/login/Login"
import AdminMainPage from "shared/main/admin/AdminMain"
import StudentPage from "student/components/list/StudentList"
import CoursePage from "course/Course"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "auth/components/ProtectedRoute"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "auth/contexts/loginReducer"
import { useEffect } from "react"
import { AppDispatch, RootState } from "shared/utils/store"
import StudentDetailPage from "student/components/detail/view/StudentDetailView"
import StudentDetailEditPage from "student/components/detail/edit/StudentDetailEdit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ParentInfoEditPage from "student/components/detail/edit/ParentDetailEdit"
import StudentInfoAdd from "student/components/detail/add/StudentInfoAdd"

const App: React.FC = () => {
  const queryClient = new QueryClient()
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
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student/:studentId/view" element={<StudentDetailPage />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="ADMIN" redirectPath="/">
                <AdminMainPage />
              </ProtectedRoute>
            }
          >
            <Route path="student/" element={<StudentPage />} />
            <Route path="student/add" element={<StudentInfoAdd />} />
            <Route path="student/:studentId/edit" element={<StudentDetailEditPage />} />
            <Route path="student/parent/:studentId/edit" element={<ParentInfoEditPage />} />
            <Route path="course" element={<CoursePage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
