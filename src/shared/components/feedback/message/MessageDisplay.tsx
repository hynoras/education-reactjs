import { message } from "antd"

const MessageDisplay: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message"
    })
  }
  return <>{contextHolder}</>
}

export default MessageDisplay
