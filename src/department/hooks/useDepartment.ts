import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { DEPARTMENT } from "department/constants/departmentConstants"
import { DepartmentNameList } from "department/models/dtos/department"
import departmentService from "department/services/departmentService"
import { GENERIC } from "shared/constants/genericValues"
import { useHandleTanStackQueryError } from "shared/hooks/useHandleError"
import { TanStackQueryOptions } from "shared/models/dtos/queryOptions"

class UseDepartment {
  useFetchDepartmentNames = (): TanStackQueryOptions => {
    const {
      data: departmentNames,
      isLoading: departmentNamesLoading,
      error,
      isError
    } = useQuery<Array<DepartmentNameList>>({
      queryKey: [DEPARTMENT.KEY.DEPARTMENT_NAME_PLURAL],
      queryFn: () => departmentService.getAllDepartmentName(),
      staleTime: GENERIC.DATETIME.ONE_HOUR_AS_MILISEC
    })
    useHandleTanStackQueryError(error as AxiosError, isError)
    return { data: departmentNames, isLoading: departmentNamesLoading }
  }
}
const useDepartment = new UseDepartment()
export default useDepartment
