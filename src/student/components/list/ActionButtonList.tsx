import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@mui/material"
import { Tooltip } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DeleteConfirm from "./DeleteConfirm"
import studentService from "student/services/student/studentService"

type ActionButtonListProps = {
  identity: string | undefined
}

const ActionButtonList: React.FC<ActionButtonListProps> = ({ identity }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate(`/admin/student/${identity}/edit`)
  }

  const deleteStudentMutation = (identity: string | undefined) => {
    return studentService.deleteStudentPersonalInfo(identity)
  }

  const handleDelete = () => {
    setOpen(true)
  }
  return (
    <div className="student-table-action-container">
      <Tooltip placement="top" title={"edit"} arrow={false}>
        <IconButton onClick={handleEdit} aria-label="edit" size="small" sx={{ fontSize: "16px", color: "#7494ec" }}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </IconButton>
      </Tooltip>
      <Tooltip placement="top" title={"delete"} arrow={false}>
        <IconButton onClick={handleDelete} aria-label="edit" size="small" sx={{ fontSize: "16px", color: "#7494ec" }}>
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </Tooltip>
      <DeleteConfirm
        isOpen={open}
        setIsOpen={setOpen}
        mutationFn={deleteStudentMutation}
        variables={identity}
        content={`Are you sure about deleting student ${identity}?`}
      />
    </div>
  )
}

export default ActionButtonList
