import { AUTH } from "auth/constants/authConstants"
import { setAuthState } from "auth/contexts/loginReducer"
import { AxiosError } from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { AppDispatch } from "shared/utils/store"

export const useHandleTanStackQueryError = (error: AxiosError, isError: boolean) => {
  const handleException = useHandleException()
  useEffect(() => {
    if (isError && error) {
      const axiosError = error as AxiosError
      const status = axiosError.response?.status ?? 500
      handleException(status, axiosError)
    }
  }, [isError, error, handleException])
}

export const useHandleException = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  return (statusCode: number, error: unknown) => {
    switch (statusCode) {
      case 401:
        dispatch(setAuthState(false))
        navigate(AUTH.ROUTE.API.LOGIN)
        break
      case 500:
        console.error("Server error:", error)
        break
      default:
        console.warn("Unhandled error:", error)
    }
  }
}
