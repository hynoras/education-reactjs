import "./style.scss"
import { Content } from "antd/es/layout/layout"
import { useParams } from "react-router"
import parentService from "student/services/parent/parentService"
import { useMutation } from "@tanstack/react-query"
import { ParentID, ParentInfoForm } from "student/models/dtos/student/parent"
import StudentParentInfoForm from "shared/components/form/StudentParentInfoForm"
import { message } from "antd"
import { DefaultResponse } from "student/models/dtos/defaultResponse"
import { useState } from "react"

const ParentInfoEditPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  let { studentId } = useParams()
  const [upsertParents, setUpsertParents] = useState<Array<ParentInfoForm>>([])
  const [deleteParents, setDeleteParents] = useState<Array<ParentID>>([])

  console.log("upsertParents: ", upsertParents)
  console.log("deleteParents: ", deleteParents)

  const successMessage = (data: DefaultResponse | undefined) => {
    messageApi.open({
      type: "success",
      content: data?.message
    })
  }

  const upsertParentInfoMutation = useMutation({
    mutationFn: (updatedParentInfo: Array<ParentInfoForm>) => {
      return parentService.upsertParentInfo(updatedParentInfo)
    },
    onSuccess: (data) => {
      successMessage(data)
    }
  })

  const deleteParentInfoMutation = useMutation({
    mutationFn: (deletedParentInfo: Array<ParentID>) => {
      return parentService.deleteParentInfo(deletedParentInfo)
    },
    onSuccess: (data) => {
      successMessage(data)
    }
  })

  const onSubmitHandler = () => {
    upsertParentInfoMutation.mutate(upsertParents)
    deleteParentInfoMutation.mutate(deleteParents)
  }

  return (
    <Content className="student-detail-container">
      {contextHolder}
      <StudentParentInfoForm
        studentId={studentId}
        isEditing={true}
        isPending={upsertParentInfoMutation.isPending}
        onSubmitHandler={onSubmitHandler}
        upsertParents={upsertParents}
        setUpsertParents={setUpsertParents}
        deleteParents={deleteParents}
        setDeleteParents={setDeleteParents}
      />
    </Content>
  )
}

export default ParentInfoEditPage
