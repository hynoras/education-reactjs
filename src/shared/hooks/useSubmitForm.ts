import { useImperativeHandle } from "react"
import { FieldValues, UseFormHandleSubmit } from "react-hook-form"

export type SubmitFormRef = {
  submitForm: () => void
}

export function useImperativeSubmitForm<T extends FieldValues>(
  ref: React.Ref<SubmitFormRef>,
  handleSubmit: UseFormHandleSubmit<T>,
  onSubmit: (data: T) => void
) {
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit(onSubmit)()
    }
  }))
}
