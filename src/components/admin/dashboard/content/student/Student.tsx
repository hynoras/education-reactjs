import { StudentList } from "models/admin/studentModel"
import { useEffect, useState } from "react"
import { Table, Pagination, PaginationProps } from "antd"
import { Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import studentService from "services/admin/studentService"
import SearchBar from "components/search/SearchBar"
import useSearch from "hook/useSearch"
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

const StudentPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const {
    data: students,
    totalElements,
    loading,
    setSearchQuery,
    setOptions
  } = useSearch<StudentList>(studentService.getAllStudent)

  useEffect(() => {
    setOptions((prev) => ({ ...prev, currentPage: currentPage, pageSize }))
  }, [currentPage, pageSize, setOptions])

  const onChangePage: PaginationProps["onChange"] = (page: number, size: number) => {
    setCurrentPage(page)
    setPageSize(size)
  }

  return (
    <div className="student-container">
      <div className="student-wrapper">
        <div className="student-title">
          <Typography variant="h3" sx={{ color: "black" }}>
            Student List
          </Typography>
        </div>
        <div className="student-filter-search container">
          <SearchBar onSearch={(query) => setSearchQuery(query)} />
        </div>
        <Table columns={columns} dataSource={students} pagination={false} loading={loading} rowKey="identity" />
        <Pagination
          align="end"
          defaultCurrent={1}
          current={currentPage}
          total={totalElements}
          pageSize={pageSize}
          onChange={onChangePage}
          showQuickJumper
          showTotal={(total) => `Total ${total} students`}
        />
      </div>
    </div>
  )
}

export default StudentPage
