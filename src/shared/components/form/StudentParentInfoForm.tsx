import { Button, Card, Divider, Skeleton, Typography } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import studentService from "student/services/student/studentService"
import { useQuery } from "@tanstack/react-query"
import RadioGroup from "shared/components/radio/RadioGroup"
import InputRow from "shared/components/input/InputRow"
import DatePickerRow from "shared/components/datepicker/DatePickerRow"
import { ParentInfoForm } from "student/models/dtos/student/studentDetail"
import { Relationship } from "shared/enums/relationship"

const { Title } = Typography

type StudentParentInfoFormProps = {
  studentId?: string | undefined
  isEditing: boolean
  isLoading?: boolean | undefined
  isPending: boolean | undefined
  onSubmitHandler: (payload: { parent_info: Array<ParentInfoForm> }) => void
}

const StudentParentInfoForm: React.FC<StudentParentInfoFormProps> = ({
  studentId,
  isEditing,
  isLoading,
  isPending,
  onSubmitHandler
}) => {
  const [parentList, setParentList] = useState<Array<ParentInfoForm>>([])
  const relationshipMap = Object.values(Relationship).map((value) => ({
    label: value,
    value: value
  }))

  const { data: parents } = useQuery({
    queryKey: ["parents", studentId],
    queryFn: () => studentService.getStudentDetail(studentId),
    enabled: isEditing && !!studentId,
    staleTime: Infinity
  })

  const { control, handleSubmit, reset } = useForm<{ parent_info: Array<ParentInfoForm> }>({
    defaultValues: { parent_info: [] }
  })

  const { fields } = useFieldArray({
    control,
    name: "parent_info"
  })

  const addItem = () => {
    const newParentItem = parentList.concat([
      {
        id: parentList.length,
        full_name: "",
        birth_date: new Date(),
        nationality: "",
        permanent_address: "",
        relationship: Relationship.Guardian
      }
    ])
    setParentList(newParentItem)
  }

  useEffect(() => {
    if (parents && isEditing) {
      reset({
        parent_info: parents.parent_info.map((p) => ({
          ...p,
          id: p.id,
          birth_date: new Date(p.birth_date)
        }))
      })
      setParentList(
        parents.parent_info.map((p) => ({
          ...p,
          id: p.id,
          birth_date: new Date(p.birth_date)
        }))
      )
    }
  }, [isEditing, parents, reset])

  return (
    <>
      <Title level={2}> Edit parent information</Title>
      {(parents && (
        <Card className={"student-detail-card"} loading={isLoading}>
          <form className={"student-detail-form"} onSubmit={handleSubmit(onSubmitHandler)}>
            {parentList.map((field, index) => (
              <div key={index}>
                <CloseOutlined />
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
                <Divider />
              </div>
            ))}
            <Button type="dashed" onClick={addItem} block>
              + Add Item
            </Button>
            <Button className={"student-detail-form-button"} htmlType="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Submit"}
            </Button>
          </form>
        </Card>
      )) || <Skeleton active />}
    </>
  )
}

export default StudentParentInfoForm
