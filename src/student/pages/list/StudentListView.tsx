import "./StudentListView.scss"
import { useState } from "react"
import { Button, PaginationProps, TableProps } from "antd"
import studentService from "student/services/studentService"
import SearchBar from "shared/components/data_entry/search/SearchBar"
import Title from "shared/themes/text/Text"
import { StudentList, StudentListQueryOptions } from "student/models/dtos/studentList"
import { useNavigate } from "react-router"
import DeleteConfirm from "student/components/DeleteConfirm"
import StudentListPagination from "student/components/StudentListPagination"
import StudentListTable from "student/components/StudentListTable"
import { IdentityMap } from "student/models/dtos/studentDetail"
import { API } from "shared/constants/apiConstants"
import { STUDENT } from "student/constants/studentConstants"
import { GENERIC } from "shared/constants/genericValues"
import useStudent from "student/hooks/useStudent"

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"]

const StudentListViewPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [identityList, setIdentityList] = useState<Array<IdentityMap>>([])
  const navigate = useNavigate()
  let initialIdentityList: Array<IdentityMap> = []
  const [queryOptions, setQueryOptions] = useState<StudentListQueryOptions>({
    currentPage: API.PARAMS.PAGINATION.DEFAULT_CURRENT_PAGE_ANTD,
    pageSize: API.PARAMS.PAGINATION.DEFAULT_PAGE_SIZE,
    sortBy: STUDENT.KEY.IDENTITY,
    sortOrder: API.PARAMS.SORT.ORDER_DESC,
    gender: GENERIC.EMPTY_VALUE.STRING,
    major: GENERIC.EMPTY_VALUE.STRING,
    department: GENERIC.EMPTY_VALUE.STRING
  })

  const { data: students, isLoading: loading } = useStudent.useFetchStudents(queryOptions)

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

  const deleteManyStudentMutation = (identityList: Array<IdentityMap>) => {
    return studentService.deleteManyStudentPersonalInfo(identityList)
  }

  const handleRowSelection = () => {
    setOpenDeleteConfirm(true)
  }

  const handleAddManually = () => {
    navigate("add")
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
    newSelectedRowKeys.forEach((identity) => {
      initialIdentityList.push({ identity: identity.toString() })
    })
    setIdentityList(initialIdentityList)
  }

  const rowSelection: TableRowSelection<StudentList> = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const hasSelected = selectedRowKeys.length > 0

  return (
    <div className="student-container">
      <div className="student-wrapper">
        <DeleteConfirm
          isOpen={openDeleteConfirm}
          setIsOpen={setOpenDeleteConfirm}
          mutationFn={deleteManyStudentMutation}
          variables={identityList}
          content={`Are you sure about deleting ${selectedRowKeys.length} students?`}
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
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : GENERIC.EMPTY_VALUE.NULL}
          </div>
          <SearchBar onSearch={onSearch} className="student-search-bar" placeholder="Search identity or name..." />
        </div>
        <StudentListTable
          students={students?.content || GENERIC.EMPTY_VALUE.ARRAY}
          loading={loading}
          setQueryOptions={setQueryOptions}
          rowSelection={rowSelection}
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
