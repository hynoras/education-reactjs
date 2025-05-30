import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { MAJOR } from "major/constants/majorConstants"
import { MajorNameList } from "major/models/dtos/major"
import majorService from "major/services/majorService"
import { GENERIC } from "shared/constants/genericValues"
import { useHandleTanStackQueryError } from "shared/hooks/useHandleError"
import { TanStackQueryOptions } from "shared/models/dtos/queryOptions"

class UseMajor {
  useFetchMajorNames = (): TanStackQueryOptions => {
    const {
      data: majorNames,
      isLoading: majorNamesLoading,
      error,
      isError
    } = useQuery<Array<MajorNameList>>({
      queryKey: [MAJOR.KEY.MAJOR_NAME_PLURAL],
      queryFn: () => majorService.getAllMajorName(),
      staleTime: GENERIC.DATETIME.ONE_HOUR_AS_MILISEC
    })
    useHandleTanStackQueryError(error as AxiosError, isError)
    return { data: majorNames, isLoading: majorNamesLoading }
  }
}
const useMajor = new UseMajor()
export default useMajor
