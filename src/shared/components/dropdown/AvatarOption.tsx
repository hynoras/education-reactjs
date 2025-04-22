import "./style.scss"
import React from "react"
import { Select } from "antd"
import AvatarUpload from "../input/AvatarUpload"

const AvatarOption: React.FC<{ studentId: string | undefined; preview?: boolean | undefined }> = ({
  studentId,
  preview
}) => {
  const handleChange = (value: string) => {
    if (value === "preview") {
      preview = true
    }
  }
  return (
    <>
      <Select
        className={"avatar-option"}
        style={{ width: 200 }}
        onChange={handleChange}
        dropdownRender={() => (
          <>
            <p>Placeholder</p>
            <AvatarUpload studentId={studentId} />
          </>
        )}
      />
    </>
  )
}

export default AvatarOption
