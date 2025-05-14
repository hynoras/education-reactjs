import "./style.scss"
import { StudentDetailForm } from "student/models/dtos/student/studentDetail"
import { useParams } from "react-router"
import studentService from "student/services/student/studentService"
import { useMutation } from "@tanstack/react-query"
import StudentPersonalInfoForm from "shared/components/form/StudentPersonalInfoForm"
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
      />
    </Content>
  )
}

export default StudentDetailEditPage
