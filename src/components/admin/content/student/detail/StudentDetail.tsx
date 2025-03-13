import "./style.scss"
import { useParams } from "react-router-dom"
import studentService from "services/admin/studentService"
import { StudentDetail } from "models/admin/studentModel"
import useFetch from "hook/useFetch"
import { Row, Col, Card, Divider } from "antd"
import { Content } from "antd/es/layout/layout"
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@mui/material"
import { ReactNode } from "react"

const StudentDetailPage: React.FC = () => {
  const className: string[] = ["student-detail-banner"]
  let { studentId } = useParams()
  const { data: students, loading } = useFetch<StudentDetail>(studentService.getStudentDetail, {
    pathParams: studentId
  })
  const studentDetail = Array.isArray(students) ? (students[0] as StudentDetail) : (students as StudentDetail)
  const extra: ReactNode = (
    <IconButton aria-label="edit" size="small" sx={{ fontSize: "20px", color: "#7494ec" }}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </IconButton>
  )
  return (
    <>
      <Content className="student-detail-container">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className={className[0]}>
              <div className={className[0] + "-upper"}></div>
              <div className={className[0] + "-lower"}>
                <i className={className[0] + "-user-icon"}>
                  <FontAwesomeIcon icon={faUser} />
                </i>
                <div className={className[0] + "-lower-general"}>
                  <p className={className[0] + "-full-name"}>{studentDetail?.personal_information.full_name}</p>
                  <p className={className[0] + "-identity"}>{studentDetail?.personal_information.identity}</p>
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="student-info-card">
              <div className="student-info-card-decorator"></div>
              <Card className="student-info-card-wrapper" loading={loading} title="Personal Information" extra={extra}>
                <p className="student-info-content">
                  <span className="student-info-label">Full name: </span>
                  {studentDetail?.personal_information.full_name}
                </p>
                <p className="student-info-content">
                  <span className="student-info-label">Date of Birth: </span>
                  {studentDetail?.personal_information.date_of_birth}
                </p>
                <p className="student-info-content">
                  <span className="student-info-label">Gender: </span>
                  {studentDetail?.personal_information.gender}
                </p>
                <p className="student-info-content">
                  <span className="student-info-label">Permanent Address: </span>
                  {studentDetail?.personal_information.permanent_address}
                </p>
                <p className="student-info-content">
                  <span className="student-info-label">Temporary Address: </span>
                  {studentDetail?.personal_information.temporary_address || "None"}
                </p>
                <p className="student-info-content">
                  <span className="student-info-label">Ethnic Group: </span>
                  {studentDetail?.personal_information.ethnic_group}
                </p>
                <p className="student-info-content">
                  <span className="student-info-label">Religion: </span>
                  {studentDetail?.personal_information.religion}
                </p>
                <p className="student-info-content">
                  <span className="student-info-label">Citizen ID: </span>
                  {studentDetail?.personal_information.citizen_id}
                </p>
                <p className="student-info-content">
                  <span className="student-info-label">Priority Group: </span>
                  {studentDetail?.personal_information.priority_group}
                </p>
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div className="student-info-card">
              <div className="student-info-card-decorator"></div>
              <Card loading={loading} className="student-info-card-wrapper" title="Parent information" extra={extra}>
                {studentDetail?.parent_information.map((parent_info, index) => (
                  <>
                    <p className="student-info-content">
                      <span className="student-info-label">Full name: </span>
                      {parent_info.full_name}
                    </p>
                    <p className="student-info-content">
                      <span className="student-info-label">Date of birth: </span>
                      {parent_info.date_of_birth}
                    </p>
                    <p className="student-info-content">
                      <span className="student-info-label">Nationality: </span>
                      {parent_info.nationality}
                    </p>
                    <p className="student-info-content">
                      <span className="student-info-label">permanent_address: </span>
                      {parent_info.permanent_address}
                    </p>
                    <p className="student-info-content">
                      <span className="student-info-label">Relationship: </span>
                      {parent_info.relationship}
                    </p>
                    {index !== studentDetail.parent_information.length - 1 && <Divider />}
                  </>
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

export default StudentDetailPage
