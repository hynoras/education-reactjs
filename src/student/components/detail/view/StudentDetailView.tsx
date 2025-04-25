import "./style.scss"
import { useNavigate, useParams } from "react-router-dom"
import studentService from "student/services/student/studentService"
import { Row, Col, Card, Divider } from "antd"
import { Content } from "antd/es/layout/layout"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@mui/material"
import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { RootState } from "shared/utils/store"
import ImageDisplay from "shared/components/image/ImageDisplay"
import { useQuery } from "@tanstack/react-query"

const className: string[] = ["student-detail-banner", "student-info"]

const StudentDetailPage: React.FC = () => {
  const role = useSelector((state: RootState) => state.auth.user?.role)
  let { studentId } = useParams()
  const navigate = useNavigate()

  const { isLoading: loading, data: studentDetail } = useQuery({
    queryKey: ["student-detail"],
    queryFn: () => studentService.getStudentDetail(studentId)
  })

  const handleEditPersonalInfo = () => {
    navigate(`/admin/student/${studentId}/edit`)
  }

  const handleEditParentInfo = () => {
    navigate(`/admin/student/parent/${studentId}/edit`)
  }

  const editPersonalInfo: ReactNode = role === "ADMIN" && (
    <IconButton
      aria-label="edit"
      size="small"
      sx={{ fontSize: "20px", color: "#7494ec" }}
      onClick={handleEditPersonalInfo}
    >
      <FontAwesomeIcon icon={faPenToSquare} />
    </IconButton>
  )

  const editParentInfo: ReactNode = role === "ADMIN" && (
    <IconButton
      aria-label="edit"
      size="small"
      sx={{ fontSize: "20px", color: "#7494ec" }}
      onClick={handleEditParentInfo}
    >
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
                <ImageDisplay
                  studentId={studentId}
                  src={studentDetail?.avatar}
                  classNames={`${className[0]}-user-icon`}
                />
                <div className={`${className[0]}-lower-general`}>
                  <p className={`${className[0]}-full-name`}>{studentDetail?.full_name}</p>
                  <p className={`${className[0]}-identity`}>{studentDetail?.identity}</p>
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
                extra={editPersonalInfo}
              >
                <RowInfo label="Full name: " value={studentDetail?.full_name} />
                <RowInfo label="Date of Birth: " value={studentDetail?.birth_date} />
                <RowInfo label="Gender: " value={studentDetail?.gender} />
                <RowInfo label="Permanent Address: " value={studentDetail?.permanent_address} />
                <RowInfo label="Temporary Address: " value={studentDetail?.temporary_address} />
                <RowInfo label="Ethnic Group: " value={studentDetail?.ethnic_group} />
                <RowInfo label="Religion: " value={studentDetail?.religion} />
                <RowInfo label="Citizen ID: " value={studentDetail?.citizen_id} />
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
                extra={editParentInfo}
              >
                {studentDetail?.parent_info.map((parent_info, index) => (
                  <div key={index}>
                    <RowInfo label="Full name: " value={parent_info.full_name} />
                    <RowInfo label="Date of birth: " value={parent_info.birth_date} />
                    <RowInfo label="Nationality: " value={parent_info.nationality} />
                    <RowInfo label="Permanent Address: " value={parent_info.permanent_address} />
                    <RowInfo label="Relationship: " value={parent_info.relationship} />
                    {index !== studentDetail.parent_info.length - 1 && <Divider />}
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

const RowInfo: React.FC<{ label: string; value: any | undefined }> = ({ label, value }) => {
  return (
    <p className={`${className[1]}-content`}>
      <span className={`${className[1]}-label`}>{label}</span>
      {value || "None"}
    </p>
  )
}

export default StudentDetailPage
