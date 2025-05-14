import "./style.scss"
import { Content } from "antd/es/layout/layout"
import { useParams } from "react-router"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ParentID, ParentInfoForm } from "parent/models/dtos/parent"
import StudentParentInfoForm from "parent/components/form/StudentParentInfoForm"
import { message, Typography } from "antd"
import { DefaultResponse } from "shared/models/dtos/defaultResponse"
import { useRef } from "react"
import studentService from "student/services/studentService"
import parentService from "parent/services/parentService"

const { Title } = Typography

const ParentInfoEditPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { studentId } = useParams()
  const initialParentInfo = useRef<Array<ParentInfoForm>>([])
  const modifiedParentInfo = useRef<Array<ParentInfoForm>>([])
  const initialParentList = useRef<Array<ParentInfoForm>>([])

  const { data: parents } = useQuery({
    queryKey: ["parents", studentId],
    queryFn: () => studentService.getStudentDetail(studentId),
    enabled: !!studentId,
    staleTime: Infinity
  })

  if (parents) {
    initialParentList.current = parents.parent_info.map((p) => ({
      ...p,
      parent_id: p.parent_id,
      student_id: studentId,
      birth_date: new Date(p.birth_date)
    }))
  }

  const showSuccess = (data: DefaultResponse | undefined) => {
    messageApi.open({
      type: "success",
      content: data?.message
    })
  }

  const upsertMutation = useMutation({
    mutationFn: (payload: { upserts: ParentInfoForm[]; deletes: ParentID[] }) => {
      return Promise.all([
        parentService.upsertParentInfo(payload.upserts),
        parentService.deleteParentInfo(payload.deletes)
      ])
    },
    onSuccess: ([upsertRes, deleteRes]) => {
      showSuccess(upsertRes)
      showSuccess(deleteRes)
    }
  })

  const onSubmitHandler = (data: { parent_info: ParentInfoForm[] }) => {
    const current = data.parent_info
    const initial = initialParentList.current

    const deleted: ParentID[] = initial
      .filter((p) => !current.some((cp) => cp.parent_id === p.parent_id))
      .map((p) => ({ parent_id: p.parent_id }))

    upsertMutation.mutate({ upserts: current, deletes: deleted })
  }

  return (
    <Content className="student-detail-container">
      {contextHolder}
      <Title level={2}>Edit parent information</Title>
      <StudentParentInfoForm
        studentId={studentId}
        isEditing={true}
        isPending={upsertMutation.isPending}
        onSubmitHandler={onSubmitHandler}
        initialParentInfo={initialParentInfo}
        modifiedParentInfo={modifiedParentInfo}
      />
    </Content>
  )
}

export default ParentInfoEditPage
