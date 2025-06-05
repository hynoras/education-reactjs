import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "@mui/material"
import { Tooltip } from "antd"
import { useNavigate } from "react-router-dom"

type ActionButtonListProps = {
  setIsOpenDeleteConfirm: React.Dispatch<React.SetStateAction<string>>
  studentId: string | undefined
  pageURL: string
}

const ActionButtonList: React.FC<ActionButtonListProps> = ({ setIsOpenDeleteConfirm, studentId, pageURL }) => {
  const navigate = useNavigate()

  const handleEdit = () => navigate(pageURL)
  const handleDelete = () => setIsOpenDeleteConfirm(studentId as string)

  return (
    <div className="student-table-action-container">
      <Tooltip title="edit">
        <IconButton onClick={handleEdit} size="small" sx={{ color: "#7494ec" }}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </IconButton>
      </Tooltip>
      <Tooltip title="delete">
        <IconButton onClick={handleDelete} size="small" sx={{ color: "#7494ec" }}>
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default ActionButtonList
