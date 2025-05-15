import "./style.scss"
import { useNavigate, useParams } from "react-router-dom"
import studentService from "student/services/studentService"
import { Row, Col, Card, Divider } from "antd"
import { Content } from "antd/es/layout/layout"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@mui/material"
import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { RootState } from "shared/utils/store"
import ImageDisplay from "shared/components/data_entry/image/ImageDisplay"
import { useQuery } from "@tanstack/react-query"
import { NONE_VALUE } from "shared/constants/genericValues"

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
            <div className={"student-detail-banner"}>
              <div className={"student-detail-banner-upper"}></div>
              <div className={"student-detail-banner-lower"}>
                <ImageDisplay
                  studentId={studentId}
                  src={studentDetail?.avatar}
                  classNames={"student-detail-banner-user-icon"}
                />
                <div className={"student-detail-banner-lower-general"}>
                  <p className={"student-detail-banner-full-name"}>{studentDetail?.full_name}</p>
                  <p className={"student-detail-banner-identity"}>{studentDetail?.identity}</p>
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className={"student-detail-banner-card"}>
              <div className={"student-detail-banner-card-decorator"}></div>
              <Card
                className={"student-detail-banner-card-wrapper"}
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
            <div className={"student-detail-banner-card"}>
              <div className={"student-detail-banner-card-decorator"}></div>
              <Card
                loading={loading}
                className={"student-detail-banner-card-wrapper"}
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
            <Card title="Card title">To be added</Card>
          </Col>
        </Row>
      </Content>
    </>
  )
}

const RowInfo: React.FC<{ label: string; value: any | undefined }> = ({ label, value }) => {
  return (
    <p className={"student-detail-banner-content"}>
      <span className={"student-detail-banner-label"}>{label}</span>
      {value || NONE_VALUE}
    </p>
  )
}

export default StudentDetailPage
