import { useParams } from "react-router-dom"
import "./style.scss"
import studentService from "services/admin/studentService"
import { StudentDetail } from "models/admin/studentModel"
import useFetch from "hook/useFetch"
import { useEffect, useState } from "react"

const StudentDetailPage = () => {
  // const [studentDetail, setStudentDetail] = useState<StudentDetail | null>(null)

  let { studentId } = useParams()

  const { data: students } = useFetch<StudentDetail>(studentService.getStudentDetail, {
    pathParams: studentId
  })
  const studentDetail = Array.isArray(students) ? (students[0] as StudentDetail) : (students as StudentDetail)

  return (
    <>
      <p>Student ID: {studentId}</p>
      <p>Student ID: {studentDetail?.personal_information.identity}</p>
    </>
  )
}

export default StudentDetailPage
