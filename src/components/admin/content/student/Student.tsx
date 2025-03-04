import { StudentList } from "models/admin/studentModel"
import { useEffect, useState } from "react"
import { Table, Pagination, PaginationProps, TableProps, TableColumnsType } from "antd"
import { Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import studentService from "services/admin/studentService"
import SearchBar from "components/search/SearchBar"
import useSearch from "hook/useSearch"
import { Gender } from "enums/gender"
import "./style.scss"

const StudentPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [sortBy, setSortBy] = useState<string>("identity")
  const [sortOrder, setSortOrder] = useState<string>("desc")
  const [gender, setGender] = useState<string>("")
  const [major, setMajor] = useState<string>("")
  const [department, setDepartment] = useState<string>("")
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
      sortOrder: sortOrder,
      gender: gender,
      major: major,
      department: department
    }))
  }, [setOptions, currentPage, pageSize, sortBy, sortOrder, gender, major, department])

  const onChangePagination: PaginationProps["onChange"] = (page: number, size: number) => {
    setCurrentPage(page)
    setPageSize(size)
  }

  const extractFilterValues = (filtersArray: Array<any>, filterKey: string, setter: (value: string) => void) => {
    const filterSubArray = filtersArray.find((key) => key.includes(filterKey))
    setter(filterSubArray ? filterSubArray[1]?.join(",") : "")
  }

  const handleFilter = (filters: Record<any, any | null>, filtersList: Array<any>) => {
    if (filters["gender"] === null) {
      setGender("")
    }
    if (filters["major_name"] === null) {
      setMajor("")
    }
    if (filters["department_name"] === null) {
      setDepartment("")
    }
    if (filtersList.length === 0) {
      setGender("")
      setMajor("")
      setDepartment("")
    }
    extractFilterValues(filtersList, "gender", setGender)
    extractFilterValues(filtersList, "major_name", setMajor)
    extractFilterValues(filtersList, "department_name", setDepartment)
  }

  const onChangeTable: TableProps<StudentList>["onChange"] = (_, filters, sorter) => {
    const filtersList = Object.entries(filters).filter(([_, value]) => value && value.length > 0)
    handleFilter(filters, filtersList)
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter
    if (!singleSorter?.columnKey) return
    const newSortOrder = singleSorter.order === "ascend" ? "asc" : "desc"
    setSortBy(singleSorter.columnKey as string)
    setSortOrder(newSortOrder)
  }

  const genderFilter = Object.values(Gender).map((value) => ({
    text: value,
    value: value
  }))

  const columns: TableColumnsType<StudentList> = [
    { title: "Student ID", dataIndex: "identity", key: "identity", sorter: true },
    { title: "Full Name", dataIndex: "full_name", key: "fullName", sorter: true },
    { title: "Date of Birth", dataIndex: "birth_date", key: "birth_date" },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: genderFilter
    },
    {
      title: "Major",
      dataIndex: "major_name",
      key: "major_name",
      filters: [
        {
          text: "Quản trị kinh doanh",
          value: "Quản trị kinh doanh"
        },
        {
          text: "Khoa học máy tính",
          value: "Khoa học máy tính"
        },
        {
          text: "Y học cổ truyền",
          value: "Y học cổ truyền"
        }
      ]
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
      filters: [
        {
          text: "Kinh tế",
          value: "Kinh tế"
        },
        {
          text: "Công nghệ thông tin",
          value: "Công nghệ thông tin"
        },
        {
          text: "Y học",
          value: "Y học"
        }
      ]
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="student-table-action-container">
          <button>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
      align: "center"
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
        <div className="student-filter-search-container">
          <button></button>
          <SearchBar
            onSearch={(query) => setSearchQuery(query)}
            className="student-search-bar"
            placeholder="Search identity or name..."
          />
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
