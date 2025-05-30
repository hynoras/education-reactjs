import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AUTH } from "auth/constants/authConstants"
import { setAuthState } from "auth/contexts/loginReducer"
import { LoginRequest, UserResponse } from "auth/models/dtos/authModel"
import authService from "auth/services/authService"
import { AxiosError } from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { GENERIC } from "shared/constants/genericValues"
import { useHandleException, useHandleTanStackQueryError } from "shared/hooks/useHandleError"
import { TanStackQueryOptions } from "shared/models/dtos/queryOptions"
import { AppDispatch } from "shared/utils/store"
import { STUDENT } from "student/constants/studentConstants"
import studentService from "student/services/studentService"

class UseAuth {
  uselogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const handleException = useHandleException()
    const queryClient = useQueryClient()

    const mutation = useMutation({
      mutationFn: async (payload: LoginRequest) => {
        return await authService.login(payload)
      },
      onSuccess: async () => {
        const account = await queryClient.fetchQuery({
          queryKey: [AUTH.KEY.ACCOUNT_DETAIL],
          queryFn: () => authService.getAccountDetail()
        })
        if (account?.role === GENERIC.KEY.ROLE.STUDENT) {
          const studentId = await queryClient.fetchQuery({
            queryKey: [STUDENT.KEY.IDENTITY, account.username],
            queryFn: () => studentService.getIdentityByUsername(account.username)
          })
          navigate(STUDENT.ROUTE.NAVIGATION.VIEW_STUDENT_DETAIL(studentId as unknown as string))
        }
        if (account?.role === GENERIC.KEY.ROLE.ADMIN) navigate(STUDENT.ROUTE.NAVIGATION.VIEW_STUDENT_LIST)
        dispatch(setAuthState(true))
      },
      onError: (error: AxiosError) => {
        handleException(error.response?.status ?? 500, error)
      }
    })
    return { ...mutation }
  }

  useGetAccountDetail = (): TanStackQueryOptions => {
    const {
      data: account,
      isLoading: accountLoading,
      error,
      isError
    } = useQuery<UserResponse | undefined>({
      queryKey: [AUTH.KEY.ACCOUNT_DETAIL],
      queryFn: () => authService.getAccountDetail(),
      staleTime: GENERIC.DATETIME.ONE_HOUR_AS_MILISEC
    })
    useHandleTanStackQueryError(error as AxiosError, isError)
    return { data: account, isLoading: accountLoading }
  }
}

const useAuth = new UseAuth()
export default useAuth
