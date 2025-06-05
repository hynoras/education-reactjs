import "../../themes/StudentDetailEdit.scss"
import { StudentDetailForm } from "student/models/dtos/studentDetail"
import { useParams } from "react-router"
import StudentPersonalInfoForm from "student/components/PersonalInfoForm"
import { Content } from "antd/es/layout/layout"
import { message, Typography } from "antd"
import useStudent from "student/hooks/useStudent"

const StudentPersonalInfoEditPage: React.FC = () => {
  let { studentId } = useParams()
  const [messageApi, contextHolder] = message.useMessage()
  const { mutate, isPending } = useStudent.useUpdatePersonalInfoMutation(studentId as string, messageApi)

  const onSubmitHandler = (payload: StudentDetailForm) => {
    mutate(payload)
  }

  return (
    <Content className="student-detail-container">
      {contextHolder}
      <Typography.Title level={2}> Edit personal information</Typography.Title>
      <StudentPersonalInfoForm
        studentId={studentId}
        isPending={isPending}
        onSubmitHandler={onSubmitHandler}
        isEditing={true}
        setStudentId={function (value: any): void {
          throw new Error("Function not implemented.")
        }}
      />
    </Content>
  )
}

export default StudentPersonalInfoEditPage
