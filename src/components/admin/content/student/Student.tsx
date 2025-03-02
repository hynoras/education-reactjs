import { StudentList } from "models/admin/studentModel"
import { useEffect, useState } from "react"
import { Table, Pagination, PaginationProps, TableProps, TableColumnsType } from "antd"
import { Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import studentService from "services/admin/studentService"
import SearchBar from "components/search/SearchBar"
import useSearch from "hook/useSearch"
import "./style.scss"
import { SortOrder } from "antd/es/table/interface"

const StudentPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [sortBy, setSortBy] = useState<string>("identity")
  const [sortOrder, setSortOrder] = useState<string>("desc")
  const {
    data: students,
    totalElements,
    loading,
    setSearchQuery,
    setOptions
  } = useSearch<StudentList>(studentService.getAllStudent)

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      currentPage: currentPage,
      pageSize: pageSize,
      sortBy: sortBy,
      sortOrder: sortOrder
    }))
  }, [setOptions, currentPage, pageSize, sortBy, sortOrder])

  const onChangePagination: PaginationProps["onChange"] = (page: number, size: number) => {
    setCurrentPage(page)
    setPageSize(size)
  }

  const onChangeTable: TableProps<StudentList>["onChange"] = (_, __, sorter) => {
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter
    if (!singleSorter?.columnKey) return
    const newSortOrder = singleSorter.order === "ascend" ? "asc" : "desc"
    setSortBy(singleSorter.columnKey as string)
    setSortOrder(newSortOrder)
  }

  const columns: TableColumnsType<StudentList> = [
    { title: "Student ID", dataIndex: "identity", key: "identity", sorter: true },
    { title: "Full Name", dataIndex: "full_name", key: "fullName", sorter: true },
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
        <Table<StudentList>
          columns={columns}
          dataSource={students}
          pagination={false}
          loading={loading}
          rowKey="identity"
          onChange={onChangeTable}
        />
        <Pagination
          align="end"
          defaultCurrent={1}
          current={currentPage}
          total={totalElements}
          pageSize={pageSize}
          onChange={onChangePagination}
          showQuickJumper
          showTotal={(total) => `Total ${total} students`}
        />
      </div>
    </div>
  )
}

export default StudentPage
