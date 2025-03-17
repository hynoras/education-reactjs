import "./style.scss"
import { useNavigate, useParams } from "react-router-dom"
import studentService from "services/student/studentService"
import { StudentDetail } from "models/dtos/student/studentModel"
import useFetch from "hook/useFetch"
import { Row, Col, Card, Divider } from "antd"
import { Content } from "antd/es/layout/layout"
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "utils/store"

const className: string[] = ["student-detail-banner", "student-info"]

const StudentDetailPage: React.FC = () => {
  const [studentDetail, setStudentDetail] = useState<StudentDetail | null>(null)
  const [toggleEdit, setToggleEdit] = useState<boolean>(false)
  const role = useSelector((state: RootState) => state.auth.user?.role)
  let { studentId } = useParams()
  const navigate = useNavigate()
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

  const handleEdit = () => {
    navigate(`/admin/student/${studentId}/edit`)
  }

  const extra: ReactNode = role === "ADMIN" && (
    <IconButton aria-label="edit" size="small" sx={{ fontSize: "20px", color: "#7494ec" }} onClick={handleEdit}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </IconButton>
  )

  return (
    <>
      <Content className="student-detail-container">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className={className[0]}>
              <div className={`${className[0]}-upper`}></div>
              <div className={`${className[0]}-lower`}>
                <i className={`${className[0]}-user-icon`}>
                  <FontAwesomeIcon icon={faUser} />
                </i>
                <div className={`${className[0]}-lower-general`}>
                  <p className={`${className[0]}-full-name`}>{studentDetail?.personal_information.full_name}</p>
                  <p className={`${className[0]}-identity`}>{studentDetail?.personal_information.identity}</p>
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className={`${className[1]}-card`}>
              <div className={`${className[1]}-card-decorator`}></div>
              <Card
                className={`${className[1]}-card-wrapper`}
                loading={loading}
                title="Personal Information"
                extra={extra}
              >
                <RowInfo label="Full name: " value={studentDetail?.personal_information.full_name} />
                <RowInfo label="Date of Birth: " value={studentDetail?.personal_information.date_of_birth} />
                <RowInfo label="Gender: " value={studentDetail?.personal_information.gender} />
                <RowInfo label="Permanent Address: " value={studentDetail?.personal_information.permanent_address} />
                <RowInfo label="Temporary Address: " value={studentDetail?.personal_information.temporary_address} />
                <RowInfo label="Ethnic Group: " value={studentDetail?.personal_information.ethnic_group} />
                <RowInfo label="Religion: " value={studentDetail?.personal_information.religion} />
                <RowInfo label="Citizen ID: " value={studentDetail?.personal_information.citizen_id} />
                <RowInfo label="Priority Group: " value={studentDetail?.personal_information.priority_group} />
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div className={`${className[1]}-card`}>
              <div className={`${className[1]}-card-decorator`}></div>
              <Card
                loading={loading}
                className={`${className[1]}-card-wrapper`}
                title="Parent information"
                extra={extra}
              >
                {studentDetail?.parent_information.map((parent_info, index) => (
                  <div key={index}>
                    <RowInfo label="Full name: " value={parent_info.full_name} />
                    <RowInfo label="Date of birth: " value={parent_info.date_of_birth} />
                    <RowInfo label="Nationality: " value={parent_info.nationality} />
                    <RowInfo label="Permanent Address: " value={parent_info.permanent_address} />
                    <RowInfo label="Relationship: " value={parent_info.relationship} />
                    {index !== studentDetail.parent_information.length - 1 && <Divider />}
                  </div>
                ))}
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <Card title="Card title">Card content</Card>
          </Col>
        </Row>
      </Content>
    </>
  )
}

const RowInfo: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => {
  return (
    <p className={`${className[1]}-content`}>
      <span className={`${className[1]}-label`}>{label}</span>
      {value || "None"}
    </p>
  )
}

export default StudentDetailPage
