import "./style.scss"
import { Content } from "antd/es/layout/layout"
import { useParams } from "react-router"
import parentService from "student/services/parent/parentService"
import { useMutation } from "@tanstack/react-query"
import { ParentInfoForm } from "student/models/dtos/student/studentDetail"
import StudentParentInfoForm from "shared/components/form/StudentParentInfoForm"
import { message } from "antd"
import { DefaultResponse } from "student/models/dtos/defaultResponse"

const ParentInfoEditPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  let { studentId } = useParams()

  const successMessage = (data: DefaultResponse | undefined) => {
    messageApi.open({
      type: "success",
      content: data?.message
    })
  }

  const mutation = useMutation({
    mutationFn: (updatedparentInfo: Array<ParentInfoForm>) => {
      return parentService.updateParentInfo(updatedparentInfo)
    },
    onSuccess: (data) => {
      successMessage(data)
    }
  })

  const onSubmitHandler = (data: { parent_info: Array<ParentInfoForm> }) => {
    mutation.mutate(data.parent_info)
  }

  return (
    <Content className="student-detail-container">
      {contextHolder}
      <StudentParentInfoForm
        studentId={studentId}
        isEditing={true}
        isPending={mutation.isPending}
        onSubmitHandler={onSubmitHandler}
      />
    </Content>
  )
}

export default ParentInfoEditPage
