import { Button, message, Upload, UploadProps } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query"
import studentService from "student/services/student/studentService"

const AvatarUpload: React.FC<{ studentId: string | undefined }> = ({ studentId }) => {
  const mutation = useMutation({
    mutationFn: (file: File) => {
      const avatar = new FormData()
      avatar.append("avatar", file)
      return studentService.updateStudentAvatar(studentId, avatar)
    }
  })

  const handleUpload: UploadProps["customRequest"] = ({ file, onSuccess }) => {
    if (!(file instanceof File)) {
      message.error("Invalid file")
      return
    }
    mutation.mutate(file, {
      onSuccess: () => {
        message.success("Image updated successfully!")
        onSuccess?.({}, new XMLHttpRequest())
      }
    })
  }

  return (
    <Upload customRequest={handleUpload} maxCount={1}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  )
}

export default AvatarUpload
