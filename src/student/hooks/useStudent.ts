import { useMutation, useQuery } from "@tanstack/react-query"
import { MessageInstance } from "antd/es/message/interface"
import { AxiosError } from "axios"
import { GENERIC } from "shared/constants/genericValues"
import { useHandleException, useHandleTanStackQueryError } from "shared/hooks/useHandleError"
import { TanStackQueryOptions } from "shared/models/dtos/queryOptions"
import { STUDENT } from "student/constants/studentConstants"
import { StudentDetailForm } from "student/models/dtos/studentDetail"
import { StudentListQueryOptions } from "student/models/dtos/studentList"
import studentService from "student/services/studentService"

class UseStudent {
  useFetchStudentId = (username: string): TanStackQueryOptions => {
    const {
      data: studentId,
      isLoading: studentIdLoading,
      error,
      isError
    } = useQuery({
      queryKey: [STUDENT.KEY.IDENTITY, username],
      queryFn: () => studentService.getIdentityByUsername(username),
      staleTime: GENERIC.DATETIME.ONE_HOUR_AS_MILISEC
    })
    useHandleTanStackQueryError(error as AxiosError, isError)
    return { data: studentId, isLoading: studentIdLoading }
  }

  useFetchStudents = (queryOptions: StudentListQueryOptions): TanStackQueryOptions => {
    const {
      data: students,
      isLoading: studentsLoading,
      error,
      isError
    } = useQuery({
      queryKey: [STUDENT.KEY.STUDENT_PLURAL, queryOptions],
      queryFn: () => studentService.getAllStudent(queryOptions),
      staleTime: GENERIC.DATETIME.ONE_HOUR_AS_MILISEC
    })
    useHandleTanStackQueryError(error as AxiosError, isError)
    return { data: students, isLoading: studentsLoading }
  }

  useFetchStudentDetail = (studentId: string, isEditing: boolean): TanStackQueryOptions => {
    const {
      data: studentDetail,
      isLoading: studentDetailLoading,
      error,
      isError
    } = useQuery({
      enabled: isEditing && !!studentId,
      queryKey: [STUDENT.KEY.STUDENT_DETAIL, studentId],
      queryFn: () => studentService.getStudentDetail(studentId!),
      staleTime: GENERIC.DATETIME.ONE_HOUR_AS_MILISEC
    })
    useHandleTanStackQueryError(error as AxiosError, isError)
    return { data: studentDetail, isLoading: studentDetailLoading }
  }

  useUpdateStudentAvatarMutation = (studentId: string, messageApi: MessageInstance) => {
    const handleException = useHandleException()
    const avatar = new FormData()

    const mutation = useMutation({
      mutationFn: (file: File) => {
        avatar.append("avatar", file)
        return studentService.updateStudentAvatar(studentId, avatar)
      },
      onSuccess: (response) => {
        messageApi.open({
          type: "success",
          content: response?.message
        })
      },
      onError: (error: AxiosError) => {
        handleException(error?.response?.status ?? 500, error)
      }
    })
    return { ...mutation }
  }

  useAddPersonalInfoMutation = (handleSucces: () => void) => {
    const handleException = useHandleException()
    const mutation = useMutation({
      mutationFn: (addPersonalInfo: StudentDetailForm) => {
        return studentService.addStudentPersonalInfo(addPersonalInfo)
      },
      onSuccess: handleSucces,
      onError: (error: AxiosError) => {
        handleException(error?.response?.status ?? 500, error)
      }
    })
    return { ...mutation }
  }

  useUpdatePersonalInfoMutation = (studentId: string, messageApi: MessageInstance) => {
    const handleException = useHandleException()
    const mutation = useMutation({
      mutationFn: (updatedStudentDetail: StudentDetailForm) => {
        return studentService.updateStudentPersonalInfo(studentId, updatedStudentDetail)
      },
      onSuccess: (response) => {
        messageApi.open({
          type: "success",
          content: response?.message
        })
      },
      onError: (error: AxiosError) => {
        handleException(error?.response?.status ?? 500, error)
      }
    })
    return { ...mutation }
  }
}

const useStudent = new UseStudent()
export default useStudent
