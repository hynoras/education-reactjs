import { Navigate, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "shared/utils/store"
import { loadUser } from "auth/contexts/loginReducer"
import { useEffect } from "react"
import { decodeToken, isTokenExpired } from "shared/utils/token"
import { useNavigate } from "react-router-dom"

interface ProtectedRouteProps {
  requiredRole: string
  redirectPath?: string
  children?: JSX.Element
}

const ProtectedRoute = ({ requiredRole, redirectPath = "/login", children }: ProtectedRouteProps) => {
  const role = useSelector((state: RootState) => state.auth.user?.role)
  const token = useSelector((state: RootState) => state.auth.token)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const rehydrated = useSelector((state: RootState) => state.auth._persist?.rehydrated)
  const decodedToken = decodeToken(token as string)

  useEffect(() => {
    if (rehydrated) {
      if (!token || isTokenExpired(decodedToken)) {
        navigate("/login")
      } else {
        dispatch(loadUser(token))
      }
    }
  }, [rehydrated, token, dispatch, navigate, decodedToken])

  if (!token) {
    return <Navigate to={redirectPath} replace />
  }

  if (role !== requiredRole) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
