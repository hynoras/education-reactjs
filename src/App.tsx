import LoginPage from "auth/pages/LoginPage"
import AdminMainPage from "shared/components/layouts/main/admin/AdminMain"
import CoursePage from "course/pages/Course"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "auth/components/ProtectedRoute"
import StudentDetailPage from "student/pages/view/StudentDetailView"
import StudentDetailEditPage from "student/pages/edit/StudentDetailEdit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ParentInfoEditPage from "parent/components/edit/ParentDetailEdit"
import StudentInfoAdd from "student/pages/add/StudentInfoAdd"
import StudentPage from "student/pages/list/StudentList"
import NavigationProvider from "shared/components/navigation/NavigationProvider"

const App: React.FC = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavigationProvider>
          <Routes>
            <Route path="/" element={<Navigate to="login" />} />
            <Route path="/login" element={<LoginPage />} />
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
        </NavigationProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
