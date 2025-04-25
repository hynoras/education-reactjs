import { Modal } from "antd"

type PopupProps = {
  isOpen: boolean
  setIsOpen: (value: React.SetStateAction<boolean>) => void
  content: string
  onOk: () => void
}

const Popup: React.FC<PopupProps> = ({ isOpen, setIsOpen, content, onOk }) => {
  const handleOk = () => {
    onOk()
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Modal title="Confirm" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{content}</p>
      </Modal>
    </>
  )
}

export default Popup
