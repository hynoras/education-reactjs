import "./style.scss"
import { useState } from "react"
import { Button, PaginationProps, TableProps } from "antd"
import studentService from "student/services/studentService"
import SearchBar from "shared/components/data_entry/search/SearchBar"
import Title from "shared/themes/text/Text"
import { useQuery } from "@tanstack/react-query"
import { StudentList } from "student/models/dtos/studentList"
import { useNavigate } from "react-router"
import DeleteConfirm from "student/components/DeleteConfirm"
import StudentListPagination from "student/components/StudentListPagination"
import StudentListTable from "student/components/StudentListTable"
import { IdentityMap } from "student/models/dtos/studentDetail"
import { DEFAULT_CURRENT_PAGE_ANTD, DEFAULT_PAGE_SIZE, SORT_ORDER_DESC } from "shared/constants/apiConstants"
import { IDENTITY, STUDENT_PLURAL } from "student/constants/studentKeys"
import { EMPTY_STRING } from "shared/constants/genericValues"

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"]

const StudentPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [identityList, setIdentityList] = useState<Array<IdentityMap>>([])
  const navigate = useNavigate()
  let initialIdentityList: Array<IdentityMap> = []
  const [queryOptions, setQueryOptions] = useState({
    currentPage: DEFAULT_CURRENT_PAGE_ANTD,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: IDENTITY,
    sortOrder: SORT_ORDER_DESC,
    gender: EMPTY_STRING,
    major: EMPTY_STRING,
    department: EMPTY_STRING
  })

  const { data: students, isLoading: loading } = useQuery({
    queryKey: [STUDENT_PLURAL, queryOptions],
    queryFn: () => studentService.getAllStudent(queryOptions),
    staleTime: Infinity
  })

  const onSearch = (query: string) => {
    setQueryOptions((prev) => ({
      ...prev,
      searchQuery: query,
      currentPage: DEFAULT_CURRENT_PAGE_ANTD
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
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
          </div>
          <SearchBar onSearch={onSearch} className="student-search-bar" placeholder="Search identity or name..." />
        </div>
        <StudentListTable
          students={students?.content || []}
          loading={loading}
          setQueryOptions={setQueryOptions}
          rowSelection={rowSelection}
        />
        <StudentListPagination
          total={students?.total_element || 0}
          queryOptions={queryOptions}
          onChangePagination={onChangePagination}
        />
      </div>
    </div>
  )
}

export default StudentPage
