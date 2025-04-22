import { Input, Typography } from "antd"
import { Control, Controller } from "react-hook-form"

const { Text } = Typography

const InputRow: React.FC<{
  className?: Array<string>
  control?: Control<any> | undefined
  name: string
  label: string
  placeholder?: string
}> = ({ className = [], control, name, label, placeholder }) => {
  return (
    <>
      <Text className={className[0] || ""} strong>
        {label}
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input className={className[1] || ""} {...field} placeholder={placeholder} />}
      />
    </>
  )
}

export default InputRow
