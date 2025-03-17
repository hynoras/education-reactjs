import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@mui/material"
import { Row, Col, Card, Divider } from "antd"
import { Content } from "antd/es/layout/layout"
import useFetch from "hook/useFetch"
import { StudentDetail } from "models/dtos/student/studentModel"
import { ReactNode, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import studentService from "services/student/studentService"
import { RootState } from "utils/store"

const StudentDetailEditPage: React.FC = () => {
  const className: string[] = ["student-detail-banner"]
  const [studentDetail, setStudentDetail] = useState<StudentDetail | null>(null)
  const role = useSelector((state: RootState) => state.auth.user?.role)
  let { studentId } = useParams()
  const { data: students, loading } = useFetch<StudentDetail>(studentService.getStudentDetail, {
    pathParams: studentId
  })

  useEffect(() => {
    if (Array.isArray(students)) {
      setStudentDetail(students[0])
    } else {
      setStudentDetail(students)
    }
  }, [students])

  const extra: ReactNode = role === "ADMIN" && (
    <IconButton aria-label="edit" size="small" sx={{ fontSize: "20px", color: "#7494ec" }}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </IconButton>
  )

  return (
    <>
      <Content className="student-detail-container">
        <p> Edit student
          </p>
      </Content>
    </>
  )
}

const RowInfo: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => {
  return (
    <p className="student-info-content">
      <span className="student-info-label">{label}</span>
      {value || "None"}
    </p>
  )
}
export default StudentDetailEditPage
