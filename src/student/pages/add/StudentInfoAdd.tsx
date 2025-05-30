import "./style.scss"
import { Button, Collapse, CollapseProps, message, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import StudentPersonalInfoForm from "shared/components/data_entry/form/StudentPersonalInfoForm"
import { StudentDetailForm } from "student/models/dtos/studentDetail"
import StudentParentInfoForm from "parent/components/form/StudentParentInfoForm"
import { ParentInfoForm } from "parent/models/dtos/parent"
import { useRef, useState } from "react"
import { SubmitFormRef } from "shared/hooks/useSubmitForm"
import { isSame } from "shared/utils/generalUtils"
import useStudent from "student/hooks/useStudent"
import useParent from "parent/hooks/useParent"

const { Title } = Typography

const StudentInfoAdd: React.FC = () => {
  const [studentId, setStudentId] = useState<string | undefined>("")
  const [messageApi, contextHolder] = message.useMessage()
  const initialParentInfo = useRef<Array<ParentInfoForm>>([])
  const modifiedParentInfo = useRef<Array<ParentInfoForm>>([])
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

  const onSubmitParentInfoHandler = (payload: { parent_info: ParentInfoForm[] }) => {
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
        <Title className={"student-detail-title"} level={3}>
          Personal information
        </Title>
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
        <Title className={"student-detail-title"} level={3}>
          Parent information
        </Title>
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
  const onChange = (key: string | string[]) => {
    console.log(key)
  }

  return (
    <Content className="student-detail-container">
      {contextHolder}
      <div className={"student-detail-title-wrapper"}>
        <Title level={2}> Add student information</Title>
        <Button className={"student-detail-form-button-top"} htmlType="submit" onClick={onClick}>
          {"Save"}
        </Button>
      </div>
      <Collapse size="small" items={items} defaultActiveKey={["1"]} bordered={false} onChange={onChange} />
      <Button className={"student-detail-form-button-bottom"} htmlType="submit" onClick={onClick}>
        {"Save"}
      </Button>
    </Content>
  )
}

export default StudentInfoAdd
