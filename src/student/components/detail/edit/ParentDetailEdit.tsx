import "./style.scss"
import { Content } from "antd/es/layout/layout"
import { useParams } from "react-router"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ParentID, ParentInfoForm } from "student/models/dtos/student/parent"
import StudentParentInfoForm from "shared/components/form/StudentParentInfoForm"
import { message } from "antd"
import { DefaultResponse } from "student/models/dtos/defaultResponse"
import { useRef } from "react"
import studentService from "student/services/student/studentService"
import parentService from "student/services/parent/parentService"

const ParentInfoEditPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { studentId } = useParams()
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

    const deleted: ParentID[] = initial.filter((p) => !current.some((cp) => cp.id === p.id)).map((p) => ({ id: p.id }))

    upsertMutation.mutate({ upserts: current, deletes: deleted })
  }

  return (
    <Content className="student-detail-container">
      {contextHolder}
      <StudentParentInfoForm
        studentId={studentId}
        isEditing={true}
        isPending={upsertMutation.isPending}
        onSubmitHandler={onSubmitHandler}
      />
    </Content>
  )
}

export default ParentInfoEditPage
