import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "utils/store"

interface ProtectedRouteProps {
  requiredRole: string
  redirectPath?: string
  children?: JSX.Element
}

const ProtectedRoute = ({ requiredRole, redirectPath = "/", children }: ProtectedRouteProps) => {
  const role = useSelector((state: RootState) => state.auth.user?.role)

  if (role !== requiredRole) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
