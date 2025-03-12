import "./style.scss"
import { useParams } from "react-router-dom"
import studentService from "services/admin/studentService"
import { StudentDetail } from "models/admin/studentModel"
import useFetch from "hook/useFetch"
import { Row, Col, Card } from "antd"
import { Content } from "antd/es/layout/layout"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StudentDetailPage = () => {
  let { studentId } = useParams()
  studentId = "20521811"
  // const { data: students } = useFetch<StudentDetail>(studentService.getStudentDetail, {
  //   pathParams: studentId
  // })
  // const studentDetail = Array.isArray(students) ? (students[0] as StudentDetail) : (students as StudentDetail)
  const style: React.CSSProperties = { background: "#0092ff", padding: "8px" }

  return (
    <>
      <Content className="student-detail-container">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className="student-detail-banner">
              <div className="student-detail-banner-upper"></div>
              <div className="student-detail-banner-lower">
                <i className="student-detail-banner-user-icon">
                  <FontAwesomeIcon icon={faUser} />
                </i>
                <div className="student-detail-banner-lower-general">
                  <p className="student-detail-banner-full-name">Quach Vinh Quang</p>
                  <p className="student-detail-banner-identity">20521811</p>
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <Card title="Personal Information">
              <p className="personal-info-content">
                <span className="personal-info-label">Full name: </span>Name
              </p>
              <p className="personal-info-content">
                <span className="personal-info-label">Date of Birth: </span>Name
              </p>
              <p className="personal-info-content">
                <span className="personal-info-label">Gender: </span>Name
              </p>
              <p className="personal-info-content">
                <span className="personal-info-label">Permanent Address: </span>Name
              </p>
              <p className="personal-info-content">
                <span className="personal-info-label">Temporary Address: </span>Name
              </p>
              <p className="personal-info-content">
                <span className="personal-info-label">Ethnic Group: </span>Name
              </p>
              <p className="personal-info-content">
                <span className="personal-info-label">Religion: </span>Name
              </p>
              <p className="personal-info-content">
                <span className="personal-info-label">Citizen ID: </span>Name
              </p>
              <p className="personal-info-content">
                <span className="personal-info-label">Priority Group: </span>Name
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title">Card content</Card>
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
