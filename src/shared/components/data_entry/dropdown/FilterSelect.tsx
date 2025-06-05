import "shared/themes/Select.scss"
import { Checkbox, Select, Typography } from "antd"
import { ControllerRenderProps, Controller } from "react-hook-form"
import { BaseSelectProps } from "shared/models/dtos/dataDisplayandEntry"

const FilterSelect: React.FC<
  BaseSelectProps & {
    options: { label: string; value: any }[]
    placeholder?: string
  }
> = ({
  className = [],
  control,
  name,
  label,
  showLabel,
  isForm,
  value,
  onChange,
  options,
  placeholder = "Select Option"
}) => {
  const renderSelect = (field?: ControllerRenderProps<any, string>) => (
    <Select
      {...field}
      allowClear
      mode="multiple"
      maxTagCount={0}
      className={className[1] || ""}
      options={options?.map((option) => ({
        label: (
          <Checkbox
            checked={value?.includes(option.value)}
            style={{ marginInlineStart: 0 }} // prevent indent
          >
            {option.label}
          </Checkbox>
        ),
        value: option.value
      }))}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      dropdownRender={(menu) => <div>{menu}</div>}
    />
  )

  return (
    <>
      {showLabel && (
        <Typography.Text className={className[0] || ""} strong>
          {label}
        </Typography.Text>
      )}
      {isForm ? (
        <Controller name={name} control={control} render={({ field }) => renderSelect(field)} />
      ) : (
        renderSelect()
      )}
    </>
  )
}

export default FilterSelect
