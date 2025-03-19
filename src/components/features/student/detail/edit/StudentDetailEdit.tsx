import "./style.scss"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Card, Col, DatePicker, Form, Input, Radio, Row, Skeleton, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import dayjs from "dayjs"
import useFetch from "hook/useFetch"
import { Student } from "models/domains/student"
import { StudentDetailForm } from "models/dtos/student/studentDetail"
import { studentDetailSchema } from "models/validation/student/studentDetailSchema"
import { useEffect, useState } from "react"
import { Control, Controller, useForm } from "react-hook-form"
import { useParams } from "react-router"
import studentService from "services/student/studentService"
import { useMutation } from "@tanstack/react-query"
import { Gender } from "enums/gender"
import { SubmitButton } from "themes/button/LoginButton"

const { Text, Title } = Typography

const StudentDetailEditPage: React.FC = () => {
  const [studentDetail, setStudentDetail] = useState<Student>()
  let { studentId } = useParams()
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
    setValue,
    formState: { errors }
  } = useForm<StudentDetailForm>({
    resolver: yupResolver(studentDetailSchema),
    defaultValues: {
      full_name: "",
      birth_date: new Date(),
      gender: Gender.MALE,
      permanent_address: "",
      temporary_address: "",
      ethnic_group: "",
      religion: "",
      citizen_id: "",
      priority_group: ""
    }
  })

  useEffect(() => {
    if (studentDetail) {
      setValue("full_name", studentDetail.full_name)
      setValue("birth_date", new Date(studentDetail.date_of_birth))
      setValue("gender", studentDetail.gender)
      setValue("permanent_address", studentDetail.permanent_address)
      setValue("temporary_address", studentDetail.temporary_address)
      setValue("ethnic_group", studentDetail.ethnic_group)
      setValue("religion", studentDetail.religion)
      setValue("citizen_id", studentDetail.citizen_id)
      setValue("priority_group", studentDetail.priority_group)
    }
  }, [studentDetail, setValue])

  const mutation = useMutation({
    mutationFn: (updatedStudentDetail: StudentDetailForm) => {
      console.log("Mutation triggered with:", updatedStudentDetail)
      return studentService.putStudentDetail(studentId, updatedStudentDetail)
    },
    onSuccess: () => {
      alert("Student updated successfully!")
    }
  })

  const onSubmitHandler = (payload: StudentDetailForm) => {
    console.log("Submitting:", payload)
    mutation.mutate(payload)
  }

  return (
    <>
      <Content className="student-detail-container">
        <Title level={2}> Edit student</Title>
        {(studentDetail && (
          <form className={"student-detail-form"} onSubmit={handleSubmit(onSubmitHandler)}>
            <Row gutter={[16, 16]}>
              <Col className="student-detail-form-wrapper" span={12}>
                <Card>
                  <InputRow
                    control={control}
                    name={"full_name"}
                    placeholder="Ex: Quach Vinh Quang"
                    label={"Full Name"}
                  />
                  {errors.full_name && <Text type="danger">{errors.full_name?.message}</Text>}
                  <Form.Item className="student-detail-item-label" label={"Birth Date"}>
                    <Controller
                      name="birth_date"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          format="YYYY-MM-DD"
                          value={field.value ? dayjs(field.value) : undefined}
                        />
                      )}
                    />
                    {errors.birth_date && <Text type="danger">{errors.birth_date?.message}</Text>}
                  </Form.Item>
                  <Form.Item className="student-detail-item-label" label={"Gender"}>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Radio.Group
                          {...field}
                          defaultValue={studentDetail?.gender}
                          options={[
                            { value: "Male", label: "Male" },
                            { value: "Female", label: "Female" }
                          ]}
                        />
                      )}
                    />
                  </Form.Item>
                  <InputRow
                    control={control}
                    name={"permanent_address"}
                    placeholder="Enter permanent address"
                    label={"Permanent Address"}
                  />
                  {errors.permanent_address && <Text type="danger">{errors.permanent_address?.message}</Text>}
                  <InputRow
                    control={control}
                    name={"temporary_address"}
                    placeholder="Enter temporary address"
                    label={"Temporary Address"}
                  />
                  <InputRow
                    control={control}
                    name={"ethnic_group"}
                    placeholder="Enter ethnic group"
                    label={"Ethnic Group"}
                  />
                  <InputRow control={control} name={"religion"} placeholder="Enter religion" label={"Religion"} />
                  <InputRow control={control} name={"citizen_id"} placeholder="Enter citizen id" label={"Citizen ID"} />
                  {errors.citizen_id && <Text type="danger">{errors.citizen_id?.message}</Text>}
                  <Form.Item className="student-detail-item-label" label={"Priority Group"}>
                    <Controller
                      name="priority_group"
                      control={control}
                      render={({ field }) => (
                        <Radio.Group
                          {...field}
                          defaultValue={studentDetail?.priority_group}
                          options={[
                            { value: "None", label: "None" },
                            { value: "Vùng sâu", label: "Vùng sâu" },
                            { value: "Con thương binh", label: "Con thương binh" }
                          ]}
                        />
                      )}
                    />
                  </Form.Item>
                    <Button
                      className={"student-detail-form-button"}
                      htmlType="submit"
                      disabled={mutation.isPending}
                    >
                    {mutation.isPending ? "Saving..." : "Submit"}
                  </Button>
                </Card>
              </Col>
            </Row>
          </form>
        )) || <Skeleton active />}
      </Content>
    </>
  )
}

const InputRow: React.FC<{
  control?: Control<any> | undefined
  name: string
  label: string
  placeholder?: string
}> = ({ control, name, label, placeholder }) => {
  return (
    <>
      <Form.Item className="student-detail-item-label" label={label}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Input className="student-detail-item-input" {...field} placeholder={placeholder} />}
        />
      </Form.Item>
    </>
  )
}

export default StudentDetailEditPage
