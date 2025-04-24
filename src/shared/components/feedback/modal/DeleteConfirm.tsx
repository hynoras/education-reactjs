import { useMutation } from "@tanstack/react-query"
import { message, Modal } from "antd"
import { DefaultResponse } from "student/models/dtos/defaultResponse"
import studentService from "student/services/student/studentService"

type DeleteConfirmProps = {
  isOpen: boolean
  setIsOpen: (value: React.SetStateAction<boolean>) => void
  identity: string | undefined
}

const DeleteConfirm: React.FC<DeleteConfirmProps> = ({ isOpen, setIsOpen, identity }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const mutation = useMutation({
    mutationFn: (identity: string | undefined) => {
      return studentService.deleteStudentPersonalInfo(identity)
    },
    onSuccess: (data) => {
      successMessage(data)
    }
  })

  const successMessage = (data: DefaultResponse | undefined) => {
    messageApi.open({
      type: "success",
      content: data?.message
    })
  }

  const handleOk = () => {
    mutation.mutate(identity)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <>
      {contextHolder}
      <Modal title="Confirm" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure about deleting student {identity}? This action can not be undone</p>
      </Modal>
    </>
  )
}

export default DeleteConfirm
