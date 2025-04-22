import { Input, Typography } from "antd"
import { Control, Controller } from "react-hook-form"

const { Text } = Typography

const InputRow: React.FC<{
  className?: Array<string>
  control?: Control<any> | undefined
  name: string
  label: string
  placeholder?: string
  disabled?: boolean
}> = ({ className = [], control, name, label, placeholder, disabled }) => {
  return (
    <>
      <Text className={className[0] || ""} strong disabled={disabled}>
        {label}
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input className={className[1] || ""} {...field} placeholder={placeholder} disabled={disabled} />
        )}
      />
    </>
  )
}

export default InputRow
