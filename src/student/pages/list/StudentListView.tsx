import "./StudentListView.scss"
import { useState } from "react"
import { Button, message, PaginationProps, TableProps } from "antd"
import SearchBar from "shared/components/data_entry/search/SearchBar"
import Title from "shared/themes/text/Text"
import { StudentList, StudentListQueryOptions } from "student/models/dtos/studentList"
import { useNavigate } from "react-router"
import StudentListPagination from "student/components/StudentListPagination"
import StudentListTable from "student/components/StudentListTable"
import { StudentIdMap } from "student/models/dtos/studentDetail"
import { API } from "shared/constants/apiConstants"
import { STUDENT } from "student/constants/studentConstants"
import { GENERIC } from "shared/constants/genericValues"
import useStudent from "student/hooks/useStudent"
import Popup from "shared/components/feedback/modal/Popup"
import StudentFilterList from "student/components/StudentFilterList"

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"]

const StudentListViewPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [studentIdList, setStudentIdList] = useState<Array<StudentIdMap>>([])
  const [majorFilter, setMajorFilter] = useState<string[] | undefined>()
  const [departmentFilter, setDepartmentFilter] = useState<string[] | undefined>()
  const [genderFilter, setGenderFilter] = useState<string[] | undefined>()
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  let initialStudentIdList: Array<StudentIdMap> = []
  const [queryOptions, setQueryOptions] = useState<StudentListQueryOptions>({
    currentPage: API.PARAMS.PAGINATION.DEFAULT_CURRENT_PAGE_ANTD,
    pageSize: API.PARAMS.PAGINATION.DEFAULT_PAGE_SIZE,
    sortBy: STUDENT.KEY.ANTD.STUDENT_ID,
    sortOrder: API.PARAMS.SORT.ORDER_DESC,
    gender: GENERIC.EMPTY_VALUE.STRING,
    major: GENERIC.EMPTY_VALUE.STRING,
    department: GENERIC.EMPTY_VALUE.STRING
  })

  const { data: students, isLoading: loading } = useStudent.useFetchStudents(queryOptions)
  const { mutate } = useStudent.useDeleteManyStudentsMutation(studentIdList, messageApi)

  const onSearch = (query: string) => {
    setQueryOptions((prev) => ({
      ...prev,
      searchQuery: query,
      currentPage: API.PARAMS.PAGINATION.DEFAULT_CURRENT_PAGE_ANTD
    }))
  }

  const onChangePagination: PaginationProps["onChange"] = (page: number, size: number) => {
    setQueryOptions((prev) => ({ ...prev, currentPage: page, pageSize: size }))
  }

  const handleConfirmDelete = () => {
    mutate()
    setSelectedRowKeys([])
    setOpenDeleteConfirm(false)
  }

  const handleRowSelection = () => {
    setOpenDeleteConfirm(true)
  }

  const handleAddManually = () => {
    navigate("add")
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
    newSelectedRowKeys.forEach((studentId) => {
      initialStudentIdList.push({ student_id: studentId.toString() })
    })
    setStudentIdList(initialStudentIdList)
  }

  const rowSelection: TableRowSelection<StudentList> = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const hasSelected = selectedRowKeys.length > 0

  return (
    <div className="student-container">
      <div className="student-wrapper">
        {contextHolder}
        <Popup
          isOpen={openDeleteConfirm}
          setIsOpen={setOpenDeleteConfirm}
          content={`Confirm deleting ${selectedRowKeys.length} students?`}
          onOk={handleConfirmDelete}
        />
        <div className="student-title">
          <Title variant="h4" sx={{ color: "black" }}>
            Student List
          </Title>
          <Button className={"add-student-manually-button"} type="primary" onClick={handleAddManually}>
            Add Manually
          </Button>
        </div>
        <div className="student-filter-search-container">
          <div>
            <Button type="primary" onClick={handleRowSelection} disabled={!hasSelected} loading={loading} danger>
              Delete
            </Button>
            <StudentFilterList
              className={["student-filter-list"]}
              majorFilter={majorFilter}
              setMajorFilter={setMajorFilter}
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
              genderFilter={genderFilter}
              setGenderFilter={setGenderFilter}
              setQueryOptions={setQueryOptions}
            />
          </div>
          <SearchBar onSearch={onSearch} className="student-search-bar" placeholder="Search student ID or name..." />
        </div>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : GENERIC.EMPTY_VALUE.NULL}
        <StudentListTable
          students={students?.content || GENERIC.EMPTY_VALUE.ARRAY}
          loading={loading}
          setQueryOptions={setQueryOptions}
          rowSelection={rowSelection}
          messageApi={messageApi}
        />
        <StudentListPagination
          total={students?.total_element || GENERIC.EMPTY_VALUE.ZERO}
          queryOptions={queryOptions}
          onChangePagination={onChangePagination}
        />
      </div>
    </div>
  )
}

export default StudentListViewPage
