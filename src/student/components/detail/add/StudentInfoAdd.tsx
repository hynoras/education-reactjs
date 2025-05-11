import "./style.scss"
import { useMutation } from "@tanstack/react-query"
import { Button, Collapse, CollapseProps, message, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import StudentPersonalInfoForm from "shared/components/form/StudentPersonalInfoForm"
import { StudentDetailForm } from "student/models/dtos/student/studentDetail"
import studentService from "student/services/student/studentService"
import StudentParentInfoForm from "shared/components/form/StudentParentInfoForm"
import { ParentInfoForm } from "student/models/dtos/student/parent"
import { DefaultResponse } from "student/models/dtos/defaultResponse"
import parentService from "student/services/parent/parentService"
import { useRef, useState } from "react"
import { SubmitFormRef } from "shared/hooks/useSubmitForm"
import { isSame } from "shared/utils/generalUtils"

const { Title } = Typography

const StudentInfoAdd: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [studentId, setStudentId] = useState<string | undefined>("")
  const initialParentInfo = useRef<Array<ParentInfoForm>>([])
  const modifiedParentInfo = useRef<Array<ParentInfoForm>>([])
  const personalInfoRef = useRef<SubmitFormRef>(null)
  const parentInfoRef = useRef<SubmitFormRef>(null)
  const personalInfoMutation = useMutation({
    mutationFn: (addPersonalInfo: StudentDetailForm) => {
      return studentService.addStudentPersonalInfo(addPersonalInfo)
    },
    onSuccess: () => {
      if (!isSame(initialParentInfo, modifiedParentInfo)) {
        onSubmitParentInfoHandler({ parent_info: modifiedParentInfo.current })
      }
    }
  })

  const parentInfoMutation = useMutation({
    mutationFn: (addParentInfo: ParentInfoForm[]) => {
      return parentService.upsertParentInfo(addParentInfo)
    },
    onSuccess: (data) => {
      showSuccess(data)
    }
  })

  const onSubmitPersonalInfoHandler = (addPersonalInfo: StudentDetailForm) => {
    personalInfoMutation.mutate(addPersonalInfo)
  }

  const onSubmitParentInfoHandler = (payload: { parent_info: ParentInfoForm[] }) => {
    console.log("payload", payload)
    payload.parent_info.forEach((parentInfo) => {
      parentInfo.student_id = studentId
    })
    parentInfoMutation.mutate(payload.parent_info)
  }

  const showSuccess = (data: DefaultResponse | undefined) => {
    messageApi.open({
      type: "success",
      content: data?.message
    })
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
