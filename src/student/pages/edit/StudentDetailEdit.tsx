import "./style.scss"
import { StudentDetailForm } from "student/models/dtos/studentDetail"
import { useParams } from "react-router"
import studentService from "student/services/studentService"
import { useMutation } from "@tanstack/react-query"
import StudentPersonalInfoForm from "shared/components/data_entry/form/StudentPersonalInfoForm"
import { Content } from "antd/es/layout/layout"
import { Typography } from "antd"

const { Title } = Typography

const StudentDetailEditPage: React.FC = () => {
  let { studentId } = useParams()

  const mutation = useMutation({
    mutationFn: (updatedStudentDetail: StudentDetailForm) => {
      return studentService.updateStudentPersonalInfo(studentId, updatedStudentDetail)
    },
    onSuccess: () => {
      alert("Student updated successfully!")
    }
  })

  const onSubmitHandler = (payload: StudentDetailForm) => {
    mutation.mutate(payload)
  }

  return (
    <Content className="student-detail-container">
      <Title level={2}> Edit personal information</Title>
      <StudentPersonalInfoForm
        studentId={studentId}
        isPending={mutation.isPending}
        onSubmitHandler={onSubmitHandler}
        isEditing={true}
        setStudentId={function (value: any): void {
          throw new Error("Function not implemented.")
        }}
      />
    </Content>
  )
}

export default StudentDetailEditPage
