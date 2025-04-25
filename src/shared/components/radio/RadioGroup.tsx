import { Radio, Typography } from "antd"
import { Control, Controller } from "react-hook-form"

const { Text } = Typography

const RadioGroup: React.FC<{
  className?: Array<string>
  control?: Control<any> | undefined
  name: string
  label: string
  value: any
  options: any
}> = ({ className = [], control, name, value, options, label }) => {
  return (
    <>
      <Text className={className[0] || ""} strong>
        {label}
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Radio.Group {...field} className={className[1] || ""} defaultValue={value} options={options} />
        )}
      />
    </>
  )
}

export default RadioGroup
