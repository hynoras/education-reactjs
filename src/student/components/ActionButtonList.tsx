import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@mui/material"
import { Tooltip } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DeleteConfirm from "./DeleteConfirm"
import studentService from "student/services/studentService"
import { STUDENT } from "student/constants/studentConstants"

type ActionButtonListProps = {
  studentId: string | undefined
}

const ActionButtonList: React.FC<ActionButtonListProps> = ({ studentId }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate(STUDENT.ROUTE.NAVIGATION.EDIT_STUDENT_PERSONAL_INFO(studentId))
  }

  const deleteStudentMutation = (studentId: string | undefined) => {
    return studentService.deleteStudentPersonalInfo(studentId)
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
        variables={studentId}
        content={`Are you sure about deleting student ${studentId}?`}
      />
    </div>
  )
}

export default ActionButtonList
