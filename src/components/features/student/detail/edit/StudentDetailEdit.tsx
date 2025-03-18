import "./style.scss"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Col, DatePicker, Input, Radio, Row, Skeleton } from "antd"
import { Content } from "antd/es/layout/layout"
import dayjs from "dayjs"
import useFetch from "hook/useFetch"
import { Student } from "models/domains/student"
import { StudentDetailForm } from "models/dtos/student/studentDetail"
import { studentDetailSchema } from "models/validation/student/studentDetailSchema"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router"
import studentService from "services/student/studentService"
import { useMutation } from "@tanstack/react-query"

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
      birth_date: "",
      gender: "",
      permanent_address: "",
      temporary_address: "",
      ethnic_group: "",
      religion: "",
      citizen_id: "",
      priority_group: ""
    }
  })

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
        <p> Edit student</p>
        {(studentDetail && (
          <form className={"student-detail-form"} onSubmit={handleSubmit(onSubmitHandler)}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Controller
                  name="full_name"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Ex: Quach Vinh Quang" />}
                />
                {errors.full_name && <p>{errors.full_name?.message}</p>}
                <Controller
                  name="birth_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      format="YYYY/MM/DD"
                      defaultValue={studentDetail?.date_of_birth ? dayjs(studentDetail.date_of_birth) : undefined}
                      onChange={(date, dateString) => field.onChange(dateString)}
                    />
                  )}
                />
                {errors.birth_date && <p>{errors.birth_date?.message}</p>}
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
                <Controller
                  name="permanent_address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      defaultValue={studentDetail?.permanent_address}
                      placeholder="Enter permanent address"
                    />
                  )}
                />
                {errors.permanent_address && <p>{errors.permanent_address?.message}</p>}
                <Controller
                  name="temporary_address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      defaultValue={studentDetail?.temporary_address}
                      placeholder="Enter temporary address"
                    />
                  )}
                />
                <Controller
                  name="ethnic_group"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} defaultValue={studentDetail?.ethnic_group} placeholder="Enter ethnic group" />
                  )}
                />
                <Controller
                  name="religion"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} defaultValue={studentDetail?.religion} placeholder="Enter religion" />
                  )}
                />
                <Controller
                  name="citizen_id"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} defaultValue={studentDetail?.citizen_id} placeholder="Enter citizen ID" />
                  )}
                />
                {errors.citizen_id && <p>{errors.citizen_id?.message}</p>}
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
              </Col>
            </Row>
            <Button type="primary" htmlType="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Submit"}
            </Button>
          </form>
        )) || <Skeleton active />}
      </Content>
    </>
  )
}

export default StudentDetailEditPage
