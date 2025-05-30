import { Navigate, Outlet } from "react-router-dom"
import { RootState } from "shared/utils/store"
import useAuth from "auth/hooks/useAuth"
import { useSelector } from "react-redux"

interface ProtectedRouteProps {
  requiredRole: string
  redirectPath?: string
  children?: JSX.Element
}

const ProtectedRoute = ({ requiredRole, redirectPath = "/login", children }: ProtectedRouteProps) => {
  const { data: account, isLoading: loadingAccount } = useAuth.useGetAccountDetail()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  if (loadingAccount) {
    return <p>Loading...</p>
  }

  if (account?.role !== requiredRole || !isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
