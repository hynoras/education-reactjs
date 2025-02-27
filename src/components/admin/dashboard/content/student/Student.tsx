import { StudentList } from "models/admin/studentModel"
import { Table, Pagination, PaginationProps } from "antd"
import { Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import studentService from "services/admin/studentService"
import "./style.scss"

const columns = [
  { title: "Student ID", dataIndex: "identity", key: "identity", sorter: true },
  { title: "Full Name", dataIndex: "full_name", key: "full_name" },
  { title: "Date of Birth", dataIndex: "birth_date", key: "birth_date" },
  { title: "Gender", dataIndex: "gender", key: "gender" },
  { title: "Major", dataIndex: "major_name", key: "major_name" },
  { title: "Department", dataIndex: "department_name", key: "department_name" },
  {
    title: "Action",
    key: "action",
    render: () => (
      <div className="student-table-action-container">
        <i>
          <FontAwesomeIcon icon={faPenToSquare} />
        </i>
        <i>
          <FontAwesomeIcon icon={faTrash} />
        </i>
      </div>
    )
  }
]

const StudentPage = () => {
  const [studentList, setStudentList] = useState<StudentList[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      const response = await studentService.getAllStudent()
      setStudentList(response.content)
      setLoading(false)
    }

    fetchStudents()
  }, [])

  return (
    <div className="student-container">
      <div className="student-wrapper">
        <div className="student-title">
          <Typography variant="h3" sx={{ color: "black" }}>
            Student list
          </Typography>
        </div>
        <Table
          columns={columns}
          dataSource={studentList}
          pagination={{ pageSize: 10, position: ["none"] }}
          loading={loading}
          rowKey="student_id"
        />
        <Pagination
          align="end"
         />
      </div>
    </div>
  )
}

export default StudentPage
