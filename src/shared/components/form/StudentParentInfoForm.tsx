import { Button, Card, Divider, Flex, Skeleton, Typography } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { useEffect, useRef } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import studentService from "student/services/student/studentService"
import { useQuery } from "@tanstack/react-query"
import RadioGroup from "shared/components/radio/RadioGroup"
import InputRow from "shared/components/input/InputRow"
import DatePickerRow from "shared/components/datepicker/DatePickerRow"
import { ParentInfoForm } from "student/models/dtos/student/parent"
import { Relationship } from "shared/enums/relationship"

const { Title } = Typography

type StudentParentInfoFormProps = {
  studentId?: string
  isEditing: boolean
  isPending: boolean | undefined
  onSubmitHandler: (payload: { parent_info: Array<ParentInfoForm> }) => void
}

const StudentParentInfoForm: React.FC<StudentParentInfoFormProps> = ({
  studentId,
  isEditing,
  isPending,
  onSubmitHandler
}) => {
  const relationshipMap = Object.values(Relationship).map((value) => ({
    label: value,
    value: value
  }))

  const initialParentList = useRef<Array<ParentInfoForm>>([])

  const { isLoading, data: parents } = useQuery({
    queryKey: ["parents", studentId],
    queryFn: () => studentService.getStudentDetail(studentId),
    enabled: isEditing && !!studentId,
    staleTime: Infinity
  })

  const { control, handleSubmit, reset } = useForm<{ parent_info: ParentInfoForm[] }>({
    defaultValues: { parent_info: [] }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parent_info"
  })

  useEffect(() => {
    if (parents && isEditing) {
      const mappedParents = parents.parent_info.map((p) => ({
        ...p,
        student_id: studentId,
        birth_date: new Date(p.birth_date)
      }))
      initialParentList.current = mappedParents
      reset({ parent_info: mappedParents })
    }
  }, [isEditing, parents, reset, studentId])

  const addItem = () => {
    append({
      id: Math.random(),
      student_id: studentId,
      full_name: "",
      birth_date: new Date(),
      nationality: "",
      permanent_address: "",
      relationship: Relationship.Guardian
    })
  }

  const removeItem = (index: number) => {
    remove(index)
  }

  const handleResetForm = () => {
    reset({ parent_info: initialParentList.current })
  }

  const handleFormSubmit = (data: { parent_info: ParentInfoForm[] }) => {
    onSubmitHandler(data)
  }

  return (
    <>
      <Title level={2}>Edit parent information</Title>
      {(parents && (
        <Card className="student-detail-card" loading={isLoading}>
          <form className="student-detail-form" onSubmit={handleSubmit(handleFormSubmit)}>
            {fields.map((field, index) => (
              <div key={field.id}>
                <CloseOutlined className="delete-parent-button" onClick={() => removeItem(index)} />
                <InputRow
                  className={["student-detail-item-label", "student-detail-item-input"]}
                  control={control}
                  name={`parent_info.${index}.full_name`}
                  label="Full Name:"
                />
                <DatePickerRow
                  className={["student-detail-item-label"]}
                  control={control}
                  name={`parent_info.${index}.birth_date`}
                  label="Birth Date:"
                  format=""
                />
                <InputRow
                  className={["student-detail-item-label", "student-detail-item-input"]}
                  control={control}
                  name={`parent_info.${index}.permanent_address`}
                  label="Permanent Address:"
                />
                <InputRow
                  className={["student-detail-item-label", "student-detail-item-input"]}
                  control={control}
                  name={`parent_info.${index}.nationality`}
                  label="Nationality:"
                />
                <RadioGroup
                  className={["student-detail-item-label", "student-detail-item-radio"]}
                  control={control}
                  name={`parent_info.${index}.relationship`}
                  label="Relationship:"
                  value={field.relationship}
                  options={relationshipMap}
                />
                <Divider />
              </div>
            ))}
            <Button type="dashed" onClick={addItem} block>
              + Add Item
            </Button>
            <Flex className="button-wrapper" justify="space-between" align="center">
              <Button htmlType="submit" className="student-detail-form-button" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
              <Button className="student-detail-form-button" onClick={handleResetForm}>
                Reset
              </Button>
            </Flex>
          </form>
        </Card>
      )) || <Skeleton active />}
    </>
  )
}

export default StudentParentInfoForm
