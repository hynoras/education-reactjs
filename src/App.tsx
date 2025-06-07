import LoginPage from "auth/pages/LoginPage"
import AdminMainPage from "shared/components/layouts/main/admin/AdminMain"
import CoursePage from "course/pages/Course"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "auth/components/ProtectedRoute"
import StudentDetailViewPage from "student/pages/view/StudentDetailView"
import StudentPersonalInfoEditPage from "student/pages/edit/StudentPersonalInfoEdit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ParentInfoEditPage from "parent/pages/edit/ParentDetailEdit"
import StudentPersonalInfoAddPage from "student/pages/add/StudentPersonalInfoAdd"
import StudentListViewPage from "student/pages/list/StudentListView"
import NavigationProvider from "shared/components/navigation/NavigationProvider"
import StudentMainPage from "shared/components/layouts/main/student/StudentMain"
import ScheduleBuilderPage from "course/pages/schedule/ScheduleBuilder"

const App: React.FC = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavigationProvider>
          <Routes>
            <Route path="/" element={<Navigate to="login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/student/:studentId/view" element={<StudentDetailViewPage />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole={["ADMIN"]} redirectPath="/">
                  <AdminMainPage />
                </ProtectedRoute>
              }
            >
              <Route path="student/" element={<StudentListViewPage />} />
              <Route path="student/add" element={<StudentPersonalInfoAddPage />} />
              <Route path="student/:studentId/edit" element={<StudentPersonalInfoEditPage />} />
              <Route path="student/parent/:studentId/edit" element={<ParentInfoEditPage />} />
              <Route path="course" element={<CoursePage />} />
            </Route>
            <Route
              path="/course/*"
              element={
                <ProtectedRoute requiredRole={["STUDENT"]} redirectPath="/">
                  <StudentMainPage />
                </ProtectedRoute>
              }
            >
              <Route path="schedule/edit" element={<ScheduleBuilderPage />} />
            </Route>
          </Routes>
        </NavigationProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
