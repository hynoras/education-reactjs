import InputRow from "shared/components/data_entry/input/InputRow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { Control } from "react-hook-form"
import { Typography } from "antd"

interface LoginInputProps {
  control: Control<any>
  name: string
  placeholder?: string
  isPassword?: boolean
  error?: string
  icon: IconDefinition
  disabled?: boolean
}

const LoginInput: React.FC<LoginInputProps> = ({
  control,
  name,
  placeholder,
  isPassword = false,
  error,
  icon,
  disabled = false
}) => {
  return (
    <>
      <div className={`input-container ${error ? "error-input" : ""}`}>
        <InputRow
          control={control}
          name={name}
          placeholder={placeholder}
          isPassword={isPassword}
          error={error}
          showError={false}
          disabled={disabled}
          label={""}
        />
        <i className="login-user-icon">
          <FontAwesomeIcon icon={icon} />
        </i>
      </div>
      {error && (
        <Typography.Text type="danger" className="error-message">
          {error}
        </Typography.Text>
      )}
    </>
  )
}

export default LoginInput
