import "./StudentDetailView.scss"
import { useNavigate, useParams } from "react-router-dom"
import studentService from "student/services/studentService"
import { Row, Col, Card, Divider } from "antd"
import { Content } from "antd/es/layout/layout"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@mui/material"
import { ReactNode } from "react"
import ImageDisplay from "shared/components/data_entry/image/ImageDisplay"
import { QueryClient, useQuery } from "@tanstack/react-query"
import { GENERIC } from "shared/constants/genericValues"
import { STUDENT } from "student/constants/studentConstants"
import { PARENT } from "parent/constants/parentConstants"
import { AUTH } from "auth/constants/authConstants"
import { UserResponse } from "auth/models/dtos/authModel"

const StudentDetailViewPage: React.FC = () => {
  const queryClient = new QueryClient()
  const account = queryClient.getQueryData<UserResponse | undefined>([AUTH.KEY.ACCOUNT_DETAIL])
  let { studentId } = useParams()
  const navigate = useNavigate()

  const { isLoading: loading, data: studentDetail } = useQuery({
    queryKey: [STUDENT.KEY.STUDENT_DETAIL],
    queryFn: () => studentService.getStudentDetail(studentId)
  })

  const handleEditPersonalInfo = () => {
    navigate(STUDENT.ROUTE.NAVIGATION.EDIT_STUDENT_PERSONAL_INFO(studentId))
  }

  const handleEditParentInfo = () => {
    navigate(PARENT.ROUTE.NAVIGATION.EDIT_PARENT_INFO(studentId))
  }

  const editPersonalInfo: ReactNode = account?.role === GENERIC.KEY.ROLE.ADMIN && (
    <IconButton
      aria-label="edit"
      size="small"
      sx={{ fontSize: "20px", color: "#7494ec" }}
      onClick={handleEditPersonalInfo}
    >
      <FontAwesomeIcon icon={faPenToSquare} />
    </IconButton>
  )

  const editParentInfo: ReactNode = account?.role === GENERIC.KEY.ROLE.ADMIN && (
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
      {value || GENERIC.EMPTY_VALUE.NONE}
    </p>
  )
}

export default StudentDetailViewPage
