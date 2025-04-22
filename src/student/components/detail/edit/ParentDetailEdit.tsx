import "./style.scss"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Card, Divider, Skeleton, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { useParams } from "react-router"
import studentService from "student/services/student/studentService"
import parentService from "student/services/parent/parentService"
import { useQuery, useMutation } from "@tanstack/react-query"
import RadioGroup from "shared/components/radio/RadioGroup"
import InputRow from "shared/components/input/InputRow"
import DatePickerRow from "shared/components/datepicker/DatePickerRow"
import { ParentInfoForm } from "student/models/dtos/student/studentDetail"
import { Relationship } from "shared/enums/relationship"

const { Title } = Typography

const ParentInfoEditPage: React.FC = () => {
  let { studentId } = useParams()

  const relationshipMap = Object.values(Relationship).map((value) => ({
    label: value,
    value: value
  }))

  const { data: parents } = useQuery({
    queryKey: ["parents", studentId],
    queryFn: () => studentService.getStudentDetail(studentId),
    enabled: !!studentId
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ parent_info: Array<ParentInfoForm> }>({
    defaultValues: { parent_info: [] }
  })

  const { fields } = useFieldArray({
    control,
    name: "parent_info"
  })

  useEffect(() => {
    if (parents) {
      reset({
        parent_info: parents.parent_info.map((p) => ({
          ...p,
          id: p.id,
          birth_date: new Date(p.birth_date)
        }))
      })
    }
  }, [parents, reset])

  const mutation = useMutation({
    mutationFn: (updatedparentInfo: Array<ParentInfoForm>) => {
      return parentService.updateParentInfo(updatedparentInfo)
    },
    onSuccess: () => {
      alert("Updated parent information successfully!")
    }
  })

  const onSubmitHandler = (data: { parent_info: Array<ParentInfoForm> }) => {
    mutation.mutate(data.parent_info)
  }

  return (
    <>
      <Content className="student-detail-container">
        <Title level={2}> Edit parent information</Title>
        {(parents && (
          <Card className={"student-detail-card"}>
            <form className={"student-detail-form"} onSubmit={handleSubmit(onSubmitHandler)}>
              {fields.map((field, index) => (
                <div key={index}>
                  <InputRow
                    className={["student-detail-item-label", "student-detail-item-input"]}
                    control={control}
                    name={`parent_info.${index}.full_name`}
                    label={"Full Name:"}
                  />
                  <DatePickerRow
                    className={["student-detail-item-label"]}
                    control={control}
                    name={`parent_info.${index}.birth_date`}
                    label={"Birth Date:"}
                    format={""}
                  />
                  <InputRow
                    className={["student-detail-item-label", "student-detail-item-input"]}
                    control={control}
                    name={`parent_info.${index}.permanent_address`}
                    label={"Permanent Address:"}
                  />
                  <InputRow
                    className={["student-detail-item-label", "student-detail-item-input"]}
                    control={control}
                    name={`parent_info.${index}.nationality`}
                    label={"Nationality:"}
                  />
                  <RadioGroup
                    className={["student-detail-item-label", "student-detail-item-radio"]}
                    control={control}
                    name={`parent_info.${index}.relationship`}
                    label={"Relationship:"}
                    value={field?.relationship}
                    options={relationshipMap}
                  />
                  {index !== fields.length - 1 && <Divider />}
                </div>
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

export default ParentInfoEditPage
