import Login from "components/auth/login/Login"
import Dashboard from "components/admin/dashboard/Dashboard"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProtectedRoute from "components/auth/ProtectedRoute"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute requiredRole="ADMIN" redirectPath="/">
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
