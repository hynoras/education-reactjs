import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import Popup from "shared/components/feedback/modal/Popup"
import { DefaultResponse } from "shared/models/dtos/defaultResponse"
import { STUDENT } from "student/constants/studentConstants"

type DeleteConfirmProps = {
  isOpen: boolean
  setIsOpen: (value: React.SetStateAction<boolean>) => void
  mutationFn?: any
  variables: any
  content: string
}

const DeleteConfirm: React.FC<DeleteConfirmProps> = ({ isOpen, setIsOpen, mutationFn, content, variables }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data: DefaultResponse) => {
      successMessage(data)
      queryClient.invalidateQueries({ queryKey: [STUDENT.KEY.GENERIC.STUDENT_PLURAL] })
    },
    onError: (data: DefaultResponse) => {
      errorMessage(data)
    }
  })

  const successMessage = (data: DefaultResponse | undefined) => {
    messageApi.open({
      type: "success",
      content: data?.message
    })
  }

  const errorMessage = (data: DefaultResponse | undefined) => {
    messageApi.open({
      type: "error",
      content: data?.message
    })
  }

  const handleOk = () => {
    mutation.mutate(variables)
    setIsOpen(false)
  }

  return (
    <>
      {contextHolder}
      <Popup isOpen={isOpen} setIsOpen={setIsOpen} content={content} onOk={handleOk}></Popup>
    </>
  )
}

export default DeleteConfirm
