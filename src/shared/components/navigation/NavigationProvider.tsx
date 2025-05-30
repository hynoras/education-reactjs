import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router"
import { setPreviousLocation } from "shared/contexts/routeReducer"
import { AppDispatch } from "shared/utils/store"

type NavigationProviderProps = {
  children: React.ReactNode
}

const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (location.pathname !== "/login") {
      dispatch(setPreviousLocation(location.pathname))
    }
  }, [location.pathname, dispatch])
  return <>{children}</>
}

export default NavigationProvider
