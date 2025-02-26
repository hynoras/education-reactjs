import { StudentList } from "models/admin/studentModel"
import { Table } from "antd"
import { Typography } from "@mui/material"
import { useState, useEffect } from "react"
import studentService from "services/admin/studentService"
import "./style.scss"

const columns = [
  { title: "Student ID", dataIndex: "identity", key: "identity", sorter: true },
  { title: "Full Name", dataIndex: "full_name", key: "full_name" },
  { title: "Major", dataIndex: "major_name", key: "major_name" },
  { title: "Department", dataIndex: "department_name", key: "department_name" }
]

const StudentPage = () => {
  const [studentList, setStudentList] = useState<StudentList[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      const response = await studentService.getAllStudent()
      setStudentList(response)
      setLoading(false)
    }

    fetchStudents()
  }, [])

  return (
    <div className="student-container">
      <Typography variant="h1" sx={{ color: "black" }}>
        Welcome back!
      </Typography>
      <Table
        columns={columns}
        dataSource={studentList}
        pagination={{ pageSize: 10 }}
        loading={loading}
        rowKey="student_id"
      />
    </div>
  )
}

export default StudentPage
