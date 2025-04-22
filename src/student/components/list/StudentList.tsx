import "./style.scss"
import { useEffect, useMemo, useState } from "react"
import { Table, Pagination, PaginationProps, TableProps, TableColumnsType } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import studentService from "student/services/student/studentService"
import SearchBar from "shared/components/search/SearchBar"
import useSearch from "student/hook/useSearch"
import { Gender } from "shared/enums/gender"
import useFetch from "student/hook/useFetch"
import { DepartmentNameList } from "student/models/dtos/student/department"
import departmentService from "student/services/student/departmentService"
import { MajorNameList } from "student/models/dtos/student/major"
import majorService from "student/services/student/majorService"
import Title from "shared/themes/text/Text"
import { IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { StudentList } from "student/models/dtos/student/studentList"

const StudentPage: React.FC = () => {
  const [queryOptions, setQueryOptions] = useState({
    currentPage: 1,
    pageSize: 10,
    sortBy: "identity",
    sortOrder: "desc",
    gender: "",
    major: "",
    department: ""
  })
  const {
    data: students,
    totalElements,
    loading,
    setSearchQuery,
    setOptions
  } = useSearch<StudentList>(studentService.getAllStudent)

  const navigate = useNavigate()

  const { data: departments } = useFetch<DepartmentNameList>(departmentService.getAllDepartmentName)
  const { data: majors } = useFetch<MajorNameList>(majorService.getAllMajorName)

  useEffect(() => {
    setOptions(queryOptions)
  }, [queryOptions, setOptions])

  const onChangePagination: PaginationProps["onChange"] = (page: number, size: number) => {
    setQueryOptions((prev) => ({ ...prev, currentPage: page, pageSize: size }))
  }

  const updateFilter = (filtersList: Array<any>, key: string) => {
    const filter = filtersList.find(([filterKey]) => filterKey.includes(key))
    return filter ? filter[1]?.join(",") : ""
  }

  const handleFilter = (filtersList: Array<any>) => {
    if (filtersList.length === 0) {
      setQueryOptions((prev) => ({
        ...prev,
        gender: "",
        major: "",
        department: ""
      }))
      return
    }

    setQueryOptions((prev) => ({
      ...prev,
      gender: updateFilter(filtersList, "gender"),
      major: updateFilter(filtersList, "major_name"),
      department: updateFilter(filtersList, "department_name")
    }))
  }

  const onChangeTable: TableProps<StudentList>["onChange"] = (_, filters, sorter) => {
    const filtersList = Object.entries(filters).filter(([_, value]) => value && value.length > 0)
    handleFilter(filtersList)

    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter
    if (!singleSorter?.columnKey) return

    setQueryOptions((prev) => ({
      ...prev,
      sortBy: singleSorter.columnKey as string,
      sortOrder: singleSorter.order === "ascend" ? "asc" : "desc"
    }))
  }

  const onClick = (record: any) => {
    navigate(`/admin/student/${record.identity}/view`)
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

  const style = {
    cursor: "pointer",
    color: "#7494ec",
    textDecoration: "underline"
  }

  const columns: TableColumnsType<StudentList> = useMemo(
    () => [
      {
        title: "Student ID",
        dataIndex: "identity",
        key: "identity",
        onCell: (record) => ({
          onClick: () => onClick(record),
          style: style
        }),
        sorter: true
      },
      {
        title: "Full Name",
        dataIndex: "full_name",
        key: "fullName",
        onCell: (record) => ({
          onClick: () => onClick(record),
          style: style
        }),
        sorter: true
      },
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
    ],
    [departmentFilter, genderFilter, majorFilter, onClick, style]
  )

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
          current={queryOptions.currentPage}
          total={totalElements}
          pageSize={queryOptions.pageSize}
          onChange={onChangePagination}
          showQuickJumper
          showTotal={(total) => `Total ${total} students`}
        />
      </div>
    </div>
  )
}

export default StudentPage
