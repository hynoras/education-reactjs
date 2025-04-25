import { Button, message, Upload, UploadProps } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query"
import studentService from "student/services/student/studentService"
import { DefaultResponse } from "student/models/dtos/defaultResponse"

const AvatarUpload: React.FC<{ studentId: string | undefined }> = ({ studentId }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const mutation = useMutation({
    mutationFn: (file: File) => {
      const avatar = new FormData()
      avatar.append("avatar", file)
      return studentService.updateStudentAvatar(studentId, avatar)
    }
  })

  const successMessage = (data: DefaultResponse | undefined) => {
    messageApi.open({
      type: "success",
      content: data?.message
    })
  }

  const handleUpload: UploadProps["customRequest"] = ({ file }) => {
    if (!(file instanceof File)) {
      message.error("Invalid file")
      return
    }
    mutation.mutate(file, {
      onSuccess: (data) => {
        successMessage(data)
      }
    })
  }

  return (
    <>
      {contextHolder}
      <Upload customRequest={handleUpload} maxCount={1} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  )
}

export default AvatarUpload
