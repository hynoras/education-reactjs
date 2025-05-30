import { Input, Typography } from "antd"
import { Control, Controller } from "react-hook-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

const { Text } = Typography

type InputRowProps = {
  control: Control<any>
  name: string
  label: string
  placeholder?: string
  isPassword?: boolean
  error?: string
  showError?: boolean
  icon?: IconDefinition
  disabled?: boolean
  className?: Array<string>
}

const InputRow: React.FC<InputRowProps> = ({
  control,
  name,
  label,
  placeholder,
  isPassword = false,
  error,
  showError = true,
  icon,
  disabled = false,
  className = ""
}) => {
  const InputComponent = isPassword ? Input.Password : Input

  return (
    <>
      <Text className={className[0] || ""} strong>
        {label}
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputComponent
            {...field}
            prefix={icon ? <FontAwesomeIcon icon={icon} /> : null}
            placeholder={placeholder}
            disabled={disabled}
            className={className[1] || ""}
          />
        )}
      />
      {error && showError && (
        <Typography.Text type="danger" className="error-message">
          {error}
        </Typography.Text>
      )}
    </>
  )
}

export default InputRow
