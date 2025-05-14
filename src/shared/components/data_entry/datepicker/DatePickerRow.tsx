import { DatePicker, Typography } from "antd"
import dayjs from "dayjs"
import { Control, Controller } from "react-hook-form"

const { Text } = Typography

const DatePickerRow: React.FC<{
  className?: Array<string>
  control?: Control<any> | undefined
  name: string
  label: string
  format: string
}> = ({ className = [], control, name, label, format = "YYYY-MM-DD" }) => {
  return (
    <>
      <Text className={className[0] || ""} strong>
        {label}
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            className={className[1] || ""}
            {...field}
            format={format}
            value={field.value ? dayjs(field.value) : undefined}
          />
        )}
      />
    </>
  )
}

export default DatePickerRow
