import "./style.scss"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Card, Skeleton, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import useFetch from "hook/useFetch"
import { Student } from "models/domains/student"
import { StudentDetailForm } from "models/dtos/student/studentDetail"
import { studentDetailSchema } from "models/validation/student/studentDetailSchema"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router"
import studentService from "services/student/studentService"
import { useMutation } from "@tanstack/react-query"
import { Gender } from "enums/gender"
import RadioGroup from "components/shared/radio/RadioGroup"
import InputRow from "components/shared/input/InputRow"
import DatePickerRow from "components/shared/datepicker/DatePickerRow"
import { formatString } from "utils/stringUtils"

const { Title } = Typography

const StudentDetailEditPage: React.FC = () => {
  const [studentDetail, setStudentDetail] = useState<Student>()
  let { studentId } = useParams()

  const genderMap = Object.values(Gender).map((value) => ({
    label: value,
    value: value
  }))

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

  const controllerName: string[] = Object.keys(students)

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
      citizen_id: ""
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
    }
  }, [studentDetail, setValue])

  const mutation = useMutation({
    mutationFn: (updatedStudentDetail: StudentDetailForm) => {
      return studentService.putStudentDetail(studentId, updatedStudentDetail)
    },
    onSuccess: () => {
      alert("Student updated successfully!")
    }
  })

  const onSubmitHandler = (payload: StudentDetailForm) => {
    mutation.mutate(payload)
  }

  const isValidItem = (validItems: Array<any>, item: string) => {
    return validItems.includes(item)
  }

  return (
    <>
      <Content className="student-detail-container">
        <Title level={2}> Edit student</Title>
        {(studentDetail && (
          <Card className={"student-detail-card"}>
            <form className={"student-detail-form"} onSubmit={handleSubmit(onSubmitHandler)}>
              {controllerName.map((item, index) => (
                <>
                  {isValidItem(["date_of_birth"], item) && (
                    <DatePickerRow
                      className={["student-detail-item-label"]}
                      control={control}
                      name={"birth_date"}
                      label={"Birth Date: "}
                      format={""}
                    />
                  )}
                  {isValidItem(["gender"], item) && (
                    <RadioGroup
                      className={["student-detail-item-label", "student-detail-item-radio"]}
                      control={control}
                      name={item}
                      label={"Gender:"}
                      value={studentDetail?.gender}
                      options={genderMap}
                    />
                  )}
                  {isValidItem(
                    ["full_name", "permanent_address", "temporary_address", "ethnic_group", "religion", "citizen_id"],
                    item
                  ) && (
                    <InputRow
                      className={["student-detail-item-label", "student-detail-item-input"]}
                      control={control}
                      name={item}
                      label={`${formatString(controllerName[index])}:`}
                    />
                  )}
                </>
              ))}
              <Button className={"student-detail-form-button"} htmlType="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Submit"}
              </Button>
            </form>
          </Card>
        )) || <Skeleton active />}
      </Content>
    </>
  )
}

export default StudentDetailEditPage
