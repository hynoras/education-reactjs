import "./style.scss"
import React from "react"
import { Select } from "antd"

const AvatarOption: React.FC<{ preview?: boolean | undefined }> = ({ preview }) => {
  const handleChange = (value: string) => {
    if (value === "preview") {
      preview = true
    }
  }
  return (
    <Select
      className={"avatar-option"}
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: "preview", label: "Preview avatar" },
        { value: "edit", label: "Change avatar" }
      ]}
    />
  )
}

export default AvatarOption
