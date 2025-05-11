import { Card, Button } from "antd"
import { yupResolver } from "@hookform/resolvers/yup"
import { Gender } from "shared/enums/gender"
import { StudentDetailForm } from "student/models/dtos/student/studentDetail"
import { studentDetailSchema } from "student/models/validation/studentDetailSchema"
import { Dispatch, forwardRef, SetStateAction, useEffect } from "react"
import { useForm } from "react-hook-form"
import { formatString } from "shared/utils/stringUtils"
import RadioGroup from "shared/components/radio/RadioGroup"
import InputRow from "shared/components/input/InputRow"
import DatePickerRow from "shared/components/datepicker/DatePickerRow"
import { useQuery } from "@tanstack/react-query"
import studentService from "student/services/student/studentService"
import { SubmitFormRef, useImperativeSubmitForm } from "shared/hooks/useSubmitForm"
import DepartmentSelect from "../dropdown/department_select/DepartmentSelect"

type StudentPersonalInfoFormProps = {
  studentId?: string | undefined
  setStudentId: Dispatch<SetStateAction<any>>
  isEditing: boolean
  isLoading?: boolean | undefined
  isPending: boolean | undefined
  onSubmitHandler: (payload: StudentDetailForm) => void | undefined
}

const StudentPersonalInfoForm = forwardRef<SubmitFormRef, StudentPersonalInfoFormProps>(
  ({ studentId, setStudentId, isEditing, isLoading, isPending, onSubmitHandler }, ref) => {
    const genderMap = Object.values(Gender).map((value) => ({
      label: value,
      value: value
    }))

    const { data: studentDetail } = useQuery({
      enabled: isEditing && !!studentId,
      queryKey: ["student-detail", studentId],
      queryFn: () => studentService.getStudentDetail(studentId!),
      staleTime: Infinity
    })

    const personal_info: StudentDetailForm = {
      full_name: "",
      birth_date: new Date(),
      gender: undefined,
      permanent_address: "",
      temporary_address: "",
      ethnic_group: "",
      religion: "",
      citizen_id: ""
    }

    const controllerName = Object.keys(personal_info)

    const { control, handleSubmit, setValue, getValues } = useForm<StudentDetailForm>({
      resolver: yupResolver(studentDetailSchema),
      defaultValues: personal_info
    })

    if (!isEditing) {
      const identity = getValues("identity")
      setStudentId(identity)
    }

    useImperativeSubmitForm(ref, handleSubmit, onSubmitHandler)

    useEffect(() => {
      if (studentDetail && isEditing) {
        setValue("full_name", studentDetail.full_name)
        setValue("birth_date", new Date(studentDetail.birth_date))
        setValue("gender", studentDetail.gender)
        setValue("permanent_address", studentDetail.permanent_address)
        setValue("temporary_address", studentDetail.temporary_address)
        setValue("ethnic_group", studentDetail.ethnic_group)
        setValue("religion", studentDetail.religion)
        setValue("citizen_id", studentDetail.citizen_id)
      }
    }, [studentDetail, isEditing, setValue])

    const isValidItem = (validItems: Array<any>, item: string) => {
      return validItems.includes(item)
    }

    return (
      <>
        <Card className={"student-detail-card"} loading={isLoading}>
          <form className={"student-detail-form"} onSubmit={handleSubmit(onSubmitHandler)}>
            {!isEditing && (
              <InputRow
                className={["student-detail-item-label", "student-detail-item-input"]}
                control={control}
                name={"identity"}
                label={"Student ID: "}
              />
            )}
            {controllerName.map((item, index) => (
              <div key={item}>
                {isValidItem(["birth_date"], item) && (
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
              </div>
            ))}
            {!isEditing && (
              <DepartmentSelect
                className={["student-detail-item-label", "student-detail-item-input"]}
                control={control}
                name={"major"}
                label={"Major: "}
                showLabel={true}
              />
            )}
            {isEditing && (
              <Button className={"student-detail-form-button"} htmlType="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
            )}
          </form>
        </Card>
      </>
    )
  }
)

export default StudentPersonalInfoForm
