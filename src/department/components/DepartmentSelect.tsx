import { Select, Typography } from "antd"
import { Control, Controller } from "react-hook-form"
import { MajorNameList } from "major/models/dtos/major"
import useMajor from "major/hooks/useMajor"

const { Text } = Typography

type DepartmentSelectProps = {
  className?: Array<string>
  control?: Control<any> | undefined
  name: string
  label: String
  showLabel: boolean
}

const DepartmentSelect: React.FC<DepartmentSelectProps> = ({ className = [], control, name, label, showLabel }) => {
  const { data } = useMajor.useFetchMajorNames()

  const majorOptions = data?.map((value: MajorNameList) => ({
    label: String(value.major_name),
    value: value.major_id
  }))

  return (
    <>
      {showLabel && (
        <Text className={className[0] || ""} strong>
          {label}
        </Text>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Select {...field} className={className[1] || ""} options={majorOptions} />}
      />
    </>
  )
}

export default DepartmentSelect
