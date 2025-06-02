import "./style.scss"
import { Content } from "antd/es/layout/layout"
import { useParams } from "react-router"
import { ParentID, ParentInfoFormDto } from "parent/models/dtos/parent"
import StudentParentInfoForm from "parent/components/ParentInfoForm"
import { message, Typography } from "antd"
import { useEffect, useRef } from "react"
import useStudent from "student/hooks/useStudent"
import useParent from "parent/hooks/useParent"

const { Title } = Typography

const ParentInfoEditPage: React.FC = () => {
  const { studentId } = useParams()
  const [messageApi, contextHolder] = message.useMessage()
  const { mutate, isPending } = useParent.useEditParentInfoMutation(messageApi)
  const initialParentInfo = useRef<Array<ParentInfoFormDto>>([])
  const modifiedParentInfo = useRef<Array<ParentInfoFormDto>>([])
  const initialParentList = useRef<Array<ParentInfoFormDto>>([])

  const { data: parents } = useStudent.useFetchStudentDetail(studentId as string, true)
  useEffect(() => {
    if (parents) {
      initialParentList.current = parents.parent_info.map((p: ParentInfoFormDto) => ({
        ...p,
        parent_id: p.parent_id,
        student_id: studentId,
        birth_date: new Date(p.birth_date as Date)
      }))
    }
  }, [parents, studentId])

  const onSubmitHandler = (data: { parent_info: ParentInfoFormDto[] }) => {
    const current = data.parent_info
    const initial = initialParentList.current

    const deleted: ParentID[] = initial
      .filter((p) => !current.some((cp) => cp.parent_id === p.parent_id))
      .map((p) => ({ parent_id: p.parent_id }))
    mutate({ upserts: current, deletes: deleted })
  }

  return (
    <Content className="student-detail-container">
      {contextHolder}
      <Title level={2}>Edit parent information</Title>
      <StudentParentInfoForm
        studentId={studentId}
        isEditing={true}
        isPending={isPending}
        onSubmitHandler={onSubmitHandler}
        initialParentInfo={initialParentInfo}
        modifiedParentInfo={modifiedParentInfo}
      />
    </Content>
  )
}

export default ParentInfoEditPage
