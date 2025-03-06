import "./style.scss"
import { StudentList } from "models/admin/studentModel"
import { useEffect, useState } from "react"
import { Table, Pagination, PaginationProps, TableProps, TableColumnsType } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import studentService from "services/admin/studentService"
import SearchBar from "components/search/SearchBar"
import useSearch from "hook/useSearch"
import { Gender } from "enums/gender"
import useFetch from "hook/useFetch"
import { DepartmentNameList } from "models/admin/departmentModel"
import departmentService from "services/admin/departmentService"
import { MajorNameList } from "models/admin/majorModel"
import majorService from "services/admin/majorService"
import Title from "themes/text/Text"
import { IconButton } from "@mui/material"

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

  const { data: departments } = useFetch<DepartmentNameList>(departmentService.getAllDepartmentName)
  const { data: majors } = useFetch<MajorNameList>(majorService.getAllMajorName)

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
    if (singleSorter?.columnKey === undefined) {
      setSortBy("")
      setSortOrder("")
    }
    const newSortOrder = singleSorter.order === "ascend" ? "asc" : "desc"
    setSortBy(singleSorter.columnKey as string)
    setSortOrder(newSortOrder)
  }

  const genderFilter = Object.values(Gender).map((value) => ({
    text: value,
    value: value
  }))

  const departmentFilter = departments.map((value) => ({
    text: String(value.department_name),
    value: String(value.department_name)
  }))

  const majorFilter = majors.map((value) => ({
    text: String(value.major_name),
    value: String(value.major_name)
  }))

  const columns: TableColumnsType<StudentList> = [
    { title: "Student ID", dataIndex: "identity", key: "identity", sorter: true },
    { title: "Full Name", dataIndex: "full_name", key: "fullName", sorter: true },
    { title: "Date of Birth", dataIndex: "birth_date", key: "birth_date" },
    { title: "Gender", dataIndex: "gender", key: "gender", filters: genderFilter },
    { title: "Major", dataIndex: "major_name", key: "major_name", filters: majorFilter },
    { title: "Department", dataIndex: "department_name", key: "department_name", filters: departmentFilter },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="student-table-action-container">
          <IconButton aria-label="edit" size="small" sx={{ fontSize: "16px", color: "#7494ec" }}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </IconButton>
          <IconButton aria-label="delete" size="small" sx={{ fontSize: "16px", color: "#7494ec" }}>
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </div>
      ),
      align: "center"
    }
  ]

  return (
    <div className="student-container">
      <div className="student-wrapper">
        <div className="student-title">
          <Title variant="h4" sx={{ color: "black" }}>
            Student List
          </Title>
        </div>
        <div className="student-filter-search-container">
          <div></div>
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
          className="student-table-pagination"
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
