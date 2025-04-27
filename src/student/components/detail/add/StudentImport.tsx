import { Typography } from "antd"
import StudentPersonalInfoForm from "shared/components/form/StudentPersonalInfoForm"
import { StudentDetailForm } from "student/models/dtos/student/studentDetail"

const { Title } = Typography

const StudentImport: React.FC = () => {
  return (
    <>
      <Title level={2}> Add student information</Title>
      <Title level={3}> Personal information</Title>
      <StudentPersonalInfoForm
        isPending={undefined}
        onSubmitHandler={function (payload: StudentDetailForm): void | undefined {
          throw new Error("Function not implemented.")
        }}
        isEditing={false}
      />
      <Title level={3}> Personal information</Title>
    </>
  )
}

export default StudentImport
