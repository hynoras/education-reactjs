import Login from "components/auth/login/Login"
import Dashboard from "components/admin/dashboard/Dashboard"
import StudentPage from "components/admin/dashboard/content/student/Student"
import CoursePage from "components/admin/dashboard/content/course/Course"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "components/auth/ProtectedRoute"

const App = () => {
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
