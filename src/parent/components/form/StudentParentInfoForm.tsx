import { Button, Card, Divider, Flex, Skeleton } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { forwardRef, useEffect, useRef } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import studentService from "student/services/studentService"
import { useQuery } from "@tanstack/react-query"
import RadioGroup from "shared/components/data_entry/radio/RadioGroup"
import InputRow from "shared/components/data_entry/input/InputRow"
import DatePickerRow from "shared/components/data_entry/datepicker/DatePickerRow"
import { ParentInfoForm } from "parent/models/dtos/parent"
import { Relationship } from "parent/enums/relationship"
import { SubmitFormRef, useImperativeSubmitForm } from "shared/hooks/useSubmitForm"

type StudentParentInfoFormProps = {
  studentId?: string
  isEditing: boolean
  isPending: boolean | undefined
  onSubmitHandler: (payload: { parent_info: Array<ParentInfoForm> }) => void
  initialParentInfo: React.MutableRefObject<Array<ParentInfoForm>>
  modifiedParentInfo: React.MutableRefObject<Array<ParentInfoForm>>
}

const StudentParentInfoForm = forwardRef<SubmitFormRef, StudentParentInfoFormProps>(
  ({ studentId, isEditing, isPending, onSubmitHandler, initialParentInfo, modifiedParentInfo }, ref) => {
    const relationshipMap = Object.values(Relationship).map((value) => ({
      label: value,
      value: value
    }))
    const fetchedParentInfo = useRef<Array<ParentInfoForm>>([])

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

    modifiedParentInfo.current = fields

    useEffect(() => {
      if (parents && isEditing) {
        const mappedParents = parents.parent_info.map((p) => ({
          ...p,
          parent_id: p.parent_id,
          student_id: studentId,
          birth_date: new Date(p.birth_date)
        }))
        initialParentInfo.current = mappedParents
        fetchedParentInfo.current = mappedParents
        reset({ parent_info: mappedParents })
      }
    }, [initialParentInfo, isEditing, parents, reset, studentId])

    const emptyParentInfo = {
      parent_id: Math.random(),
      student_id: studentId,
      full_name: "",
      birth_date: new Date(),
      nationality: "",
      permanent_address: "",
      relationship: Relationship.Guardian
    }

    const addItem = () => {
      append(emptyParentInfo)
      initialParentInfo?.current?.push(emptyParentInfo)
    }

    const removeItem = (index: number) => {
      remove(index)
      initialParentInfo.current = initialParentInfo.current.filter(
        (_, i) => initialParentInfo.current[i] !== initialParentInfo.current[index]
      )
    }

    const handleResetForm = () => {
      initialParentInfo.current = []
      reset({ parent_info: fetchedParentInfo.current })
    }

    const handleFormSubmit = (data: { parent_info: ParentInfoForm[] }) => {
      onSubmitHandler(data)
    }

    useImperativeSubmitForm(ref, handleSubmit, onSubmitHandler)

    return (
      <>
        {(!parents && isEditing && <Skeleton active />) || (
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
                + Add Parent
              </Button>
              <Flex className="button-wrapper" justify="space-between" align="center">
                {isEditing && (
                  <Button className={"student-detail-form-button"} htmlType="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save"}
                  </Button>
                )}
                <Button className="student-detail-form-button" onClick={handleResetForm}>
                  Reset
                </Button>
              </Flex>
            </form>
          </Card>
        )}
      </>
    )
  }
)

export default StudentParentInfoForm
