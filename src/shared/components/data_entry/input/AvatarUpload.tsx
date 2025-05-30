import { Button, message, Upload, UploadProps } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import useStudent from "student/hooks/useStudent"

const AvatarUpload: React.FC<{ studentId: string | undefined }> = ({ studentId }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const { mutate } = useStudent.useUpdateStudentAvatarMutation(studentId as string, messageApi)
  const handleUpload: UploadProps["customRequest"] = ({ file }) => {
    if (!(file instanceof File)) {
      message.error("Invalid file")
      return
    }
    mutate(file)
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
