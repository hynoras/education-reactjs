import { Control } from "react-hook-form"

export type WithClassName = {
  className?: Array<string> | string
}

export type WithFormControl = {
  control?: Control<any> | undefined
  name: string
  label?: string
  showLabel: boolean
}

export type WithValueControl = {
  value?: string[]
  onChange?: (value: string[]) => void
}

export type BaseSelectProps = WithClassName &
  WithFormControl &
  WithValueControl & {
    isForm: boolean
  }
