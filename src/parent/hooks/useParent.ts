import { useMutation } from "@tanstack/react-query"
import { ParentInfoFormDto, ParentID } from "parent/models/dtos/parent"
import parentService from "parent/services/parentService"
import { AxiosError } from "axios"
import { useHandleException } from "shared/hooks/useHandleError"
import { MessageInstance } from "antd/es/message/interface"

class UseParent {
  useEditParentInfoMutation = (messageApi: MessageInstance) => {
    const handleException = useHandleException()

    return useMutation({
      mutationFn: async (payload: { upserts: Array<ParentInfoFormDto>; deletes: ParentID[] }) => {
        return Promise.all([
          parentService.upsertParentInfo(payload.upserts),
          parentService.deleteParentInfo(payload.deletes)
        ])
      },
      onSuccess: ([upsertRes, deleteRes]) => {
        messageApi.open({ type: "success", content: upsertRes?.message })
        messageApi.open({ type: "success", content: deleteRes?.message })
      },
      onError: (error: AxiosError) => {
        handleException(error?.response?.status ?? 500, error)
      }
    })
  }

  useUpsertParentInfoMutation = (messageApi: MessageInstance) => {
    const handleException = useHandleException()

    const mutation = useMutation({
      mutationFn: (addParentInfo: Array<ParentInfoFormDto>) => {
        return parentService.upsertParentInfo(addParentInfo)
      },
      onSuccess: (upsertRes) => {
        messageApi.open({ type: "success", content: upsertRes?.message })
      },
      onError: (error: AxiosError) => {
        handleException(error?.response?.status ?? 500, error)
      }
    })
    return { ...mutation }
  }
}

const useParent = new UseParent()
export default useParent
