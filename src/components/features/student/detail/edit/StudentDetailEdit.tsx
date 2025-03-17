import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Col, DatePicker, Form, Input, Radio, RadioChangeEvent, Row, Skeleton } from "antd"
import { Content } from "antd/es/layout/layout"
import dayjs from "dayjs"
import useFetch from "hook/useFetch"
import { Student } from "models/domains/student"
import { LoginRequest } from "models/dtos/auth/authModel"
import { StudentForm } from "models/dtos/student/studentDetail"
import { studentDetailSchema } from "models/validation/student/studentDetailSchema"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import studentService from "services/student/studentService"
import { RootState } from "utils/store"

const StudentDetailEditPage: React.FC = () => {
  const [studentDetail, setStudentDetail] = useState<Student>()
  const dateFormat = "YYYY/MM/DD"
  const role = useSelector((state: RootState) => state.auth.user?.role)
  let { studentId } = useParams()
  const [form] = Form.useForm()
  const { data: students } = useFetch<Student>(studentService.getStudentDetail, {
    pathParams: studentId
  })

  useEffect(() => {
    if (Array.isArray(students)) {
      setStudentDetail(students[0])
    } else {
      setStudentDetail(students)
    }
  }, [students])

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<StudentForm>({
    resolver: yupResolver(studentDetailSchema)
  })

  const [genderRadio, setGenderRadio] = useState(studentDetail?.gender)
  const onChangeGender = (e: RadioChangeEvent) => {
    setGenderRadio(e.target.value)
  }

  const [priorityGroupRadio, setPriorityGroupRadio] = useState(studentDetail?.gender)
  const onChangePriorityGroup = (e: RadioChangeEvent) => {
    setPriorityGroupRadio(e.target.value)
  }

  return (
    <>
      <Content className="student-detail-container">
        <p> Edit student</p>
        {(studentDetail && (
          <Form layout={"vertical"} form={form}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <InputItem label={"Full Name"} placeholder={"Ex: Quach Vinh Quang"} value={studentDetail?.full_name} />
                <Form.Item label="Date of birth" initialValue={studentDetail?.date_of_birth}>
                  <DatePicker defaultValue={dayjs(studentDetail?.date_of_birth, dateFormat)} format={dateFormat} />
                </Form.Item>
                <Form.Item label="Gender" initialValue={studentDetail?.gender}>
                  <Radio.Group
                    value={genderRadio}
                    onChange={onChangeGender}
                    defaultValue={studentDetail?.gender}
                    options={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" }
                    ]}
                  ></Radio.Group>
                </Form.Item>
                <InputItem label={"Permanent Address"} placeholder={""} value={studentDetail?.permanent_address} />
                <InputItem label={"Temporary Address"} placeholder={""} value={studentDetail?.temporary_address} />
                <InputItem label={"Ethnic Group"} placeholder={""} value={studentDetail?.ethnic_group} />
                <InputItem label={"Religion"} placeholder={""} value={studentDetail?.religion} />
                <Form.Item label="Priority Group" initialValue={studentDetail?.priority_group}>
                  <Radio.Group
                    value={priorityGroupRadio}
                    onChange={onChangePriorityGroup}
                    defaultValue={studentDetail?.priority_group}
                    options={[
                      { value: "None", label: "None" },
                      { value: "Vùng sâu", label: "Vùng sâu" },
                      { value: "Con thương binh", label: "Con thương binh" }
                    ]}
                  ></Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>
        )) || <Skeleton active />}
      </Content>
    </>
  )
}

const InputItem: React.FC<{
  label: string | undefined
  placeholder?: string
  value?: string
}> = ({ label, placeholder, value }) => {
  return (
    <Form.Item label={label}>
      <Input placeholder={placeholder} defaultValue={value} />
    </Form.Item>
  )
}
export default StudentDetailEditPage
