import { Button, Card, Divider, Flex, Skeleton, Typography } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { useEffect, useReducer, useRef, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import studentService from "student/services/student/studentService"
import { useQuery } from "@tanstack/react-query"
import RadioGroup from "shared/components/radio/RadioGroup"
import InputRow from "shared/components/input/InputRow"
import DatePickerRow from "shared/components/datepicker/DatePickerRow"
import { ParentID, ParentInfoForm } from "student/models/dtos/student/parent"
import { Relationship } from "shared/enums/relationship"
import { parentReducer } from "student/contexts/parentReducer"

const { Title } = Typography

type StudentParentInfoFormProps = {
  studentId?: string | undefined
  isEditing: boolean
  isPending: boolean | undefined
  onSubmitHandler: (payload: { parent_info: Array<ParentInfoForm> }) => void
  upsertParents: ParentInfoForm[]
  setUpsertParents: React.Dispatch<React.SetStateAction<Array<ParentInfoForm>>>
  deleteParents: ParentID[]
  setDeleteParents: React.Dispatch<React.SetStateAction<Array<ParentID>>>
}

const StudentParentInfoForm: React.FC<StudentParentInfoFormProps> = ({
  studentId,
  isEditing,
  isPending,
  upsertParents,
  setUpsertParents,
  deleteParents,
  setDeleteParents,
  onSubmitHandler
}) => {
  const [onResetForm, setOnResetForm] = useState<boolean>(false)
  const [parentList, dispatchParentList] = useReducer(parentReducer, [])
  const initialParentList = useRef<Array<ParentInfoForm>>([])
  const relationshipMap = Object.values(Relationship).map((value) => ({
    label: value,
    value: value
  }))

  const { isLoading: loading, data: parents } = useQuery({
    queryKey: ["parents", studentId],
    queryFn: () => studentService.getStudentDetail(studentId),
    enabled: isEditing && !!studentId,
    staleTime: Infinity
  })

  const { control, handleSubmit, reset, watch } = useForm<{ parent_info: Array<ParentInfoForm> }>({
    defaultValues: { parent_info: [] }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parent_info"
  })

  const watchedParentInfo = watch("parent_info")

  useEffect(() => {
    setUpsertParents(watchedParentInfo)
  }, [setUpsertParents, watchedParentInfo])

  useEffect(() => {
    if (parents && isEditing) {
      const mappedParents = parents.parent_info.map((p) => ({
        ...p,
        student_id: studentId,
        birth_date: new Date(p.birth_date)
      }))
      initialParentList.current = mappedParents
      setUpsertParents(mappedParents)
      dispatchParentList({ type: "RESET_PARENTS", payload: mappedParents })
      reset({ parent_info: mappedParents })
    }
  }, [isEditing, parents, reset, setUpsertParents, studentId])

  const addItem = () => {
    const newParent: ParentInfoForm = {
      id: Date.now(),
      student_id: studentId,
      full_name: "",
      birth_date: new Date(),
      nationality: "",
      permanent_address: "",
      relationship: Relationship.Guardian
    }
    const added = [...upsertParents, newParent]
    setUpsertParents(added)
    dispatchParentList({ type: "ADD_PARENT", payload: newParent })
    append(newParent)
    setOnResetForm(true)
  }

  const removeItem = (index: number) => {
    const removed = [...deleteParents, { id: parentList[index].id }]
    setDeleteParents(removed)
    setUpsertParents(upsertParents.filter((_, i: number) => i !== index))
    dispatchParentList({ type: "REMOVE_PARENT", index })
    remove(index)
    reset({ parent_info: upsertParents.filter((_, i: number) => i !== index) })
    setOnResetForm(true)
  }

  const handleResetForm = () => {
    if (!onResetForm) {
      return
    }
    dispatchParentList({ type: "RESET_PARENTS", payload: initialParentList.current })
    reset({ parent_info: initialParentList.current })
    setUpsertParents(initialParentList.current)
    setDeleteParents([])
    setOnResetForm(false)
  }

  return (
    <>
      <Title level={2}> Edit parent information</Title>
      {(parents && (
        <Card className={"student-detail-card"} loading={loading}>
          <form className={"student-detail-form"} onSubmit={handleSubmit(onSubmitHandler)}>
            {fields.map((field, index) => (
              <div key={index}>
                <CloseOutlined className={"delete-parent-button"} onClick={() => removeItem(index)} />
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
            <Flex className={"button-wrapper"} justify={"space-between"} align={"center"}>
              <Button className={"student-detail-form-button"} htmlType="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
              <Button
                className={onResetForm === false ? "disable" : "student-detail-form-button"}
                disabled={!onResetForm}
                onClick={handleResetForm}
              >
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
