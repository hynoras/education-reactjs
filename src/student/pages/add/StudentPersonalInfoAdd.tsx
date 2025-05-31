import "../../themes/StudentDetailEdit.scss"
import { Button, Collapse, CollapseProps, message, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import StudentPersonalInfoForm from "student/components/PersonalInfoForm"
import { StudentDetailForm } from "student/models/dtos/studentDetail"
import StudentParentInfoForm from "parent/components/ParentInfoForm"
import { ParentInfoFormDto } from "parent/models/dtos/parent"
import { useRef, useState } from "react"
import { SubmitFormRef } from "shared/hooks/useSubmitForm"
import { isSame } from "shared/utils/generalUtils"
import useStudent from "student/hooks/useStudent"
import useParent from "parent/hooks/useParent"

const StudentPersonalInfoAddPage: React.FC = () => {
  const [studentId, setStudentId] = useState<string | undefined>("")
  const [messageApi, contextHolder] = message.useMessage()
  const initialParentInfo = useRef<Array<ParentInfoFormDto>>([])
  const modifiedParentInfo = useRef<Array<ParentInfoFormDto>>([])
  const personalInfoRef = useRef<SubmitFormRef>(null)
  const parentInfoRef = useRef<SubmitFormRef>(null)
  const handlePersonalInfoMutationSuccess = () => {
    if (!isSame(initialParentInfo, modifiedParentInfo)) {
      onSubmitParentInfoHandler({ parent_info: modifiedParentInfo.current })
    }
  }
  const { mutate } = useStudent.useAddPersonalInfoMutation(handlePersonalInfoMutationSuccess)
  const { mutate: mutateUpsertParentInfo } = useParent.useUpsertParentInfoMutation(messageApi)

  const onSubmitPersonalInfoHandler = (addPersonalInfo: StudentDetailForm) => {
    mutate(addPersonalInfo)
  }

  const onSubmitParentInfoHandler = (payload: { parent_info: Array<ParentInfoFormDto> }) => {
    payload.parent_info.forEach((parentInfo) => {
      parentInfo.student_id = studentId
    })
    mutateUpsertParentInfo(payload.parent_info)
  }

  const onClick = () => {
    personalInfoRef.current?.submitForm()
  }

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <Typography.Title className={"student-detail-title"} level={3}>
          Personal information
        </Typography.Title>
      ),
      children: (
        <StudentPersonalInfoForm
          ref={personalInfoRef}
          studentId={studentId}
          setStudentId={setStudentId}
          isEditing={false}
          isPending={undefined}
          onSubmitHandler={onSubmitPersonalInfoHandler}
        />
      )
    },
    {
      key: "2",
      label: (
        <Typography.Title className={"student-detail-title"} level={3}>
          Parent information
        </Typography.Title>
      ),
      children: (
        <StudentParentInfoForm
          ref={parentInfoRef}
          isEditing={false}
          isPending={undefined}
          onSubmitHandler={onSubmitParentInfoHandler}
          initialParentInfo={initialParentInfo}
          modifiedParentInfo={modifiedParentInfo}
        />
      )
    }
  ]

  return (
    <Content className="student-detail-container">
      {contextHolder}
      <div className={"student-detail-title-wrapper"}>
        <Typography.Title level={2}> Add student information</Typography.Title>
        <Button className={"student-detail-form-button-top"} htmlType="submit" onClick={onClick}>
          {"Save"}
        </Button>
      </div>
      <Collapse size="small" items={items} defaultActiveKey={["1"]} bordered={false} />
      <Button className={"student-detail-form-button-bottom"} htmlType="submit" onClick={onClick}>
        {"Save"}
      </Button>
    </Content>
  )
}

export default StudentPersonalInfoAddPage
