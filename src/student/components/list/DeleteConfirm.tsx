import { useMutation, useQuery } from "@tanstack/react-query"
import { message } from "antd"
import { data } from "react-router"
import Popup from "shared/components/feedback/modal/Popup"
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
    setIsOpen(false)
  }

  return (
    <>
      {contextHolder}
      <Popup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={`Are you sure about deleting student ${identity}?`}
        onOk={handleOk}
      ></Popup>
    </>
  )
}

export default DeleteConfirm
