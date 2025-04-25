import "./style.scss"
import { useState } from "react"
import { Button, PaginationProps, TableProps } from "antd"
import studentService from "student/services/student/studentService"
import SearchBar from "shared/components/search/SearchBar"
import Title from "shared/themes/text/Text"
import StudentListTable from "./StudentListTable"
import { useQuery } from "@tanstack/react-query"
import { StudentList } from "student/models/dtos/student/studentList"
import { IdentityMap } from "student/models/dtos/student/studentDetail"
import StudentListPagination from "./StudentListPagination"
import DeleteConfirm from "./DeleteConfirm"

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"]

const StudentPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [identityList, setIdentityList] = useState<Array<IdentityMap>>([])
  let initialIdentityList: Array<IdentityMap> = []
  const [queryOptions, setQueryOptions] = useState({
    currentPage: 1,
    pageSize: 10,
    sortBy: "identity",
    sortOrder: "desc",
    gender: "",
    major: "",
    department: ""
  })

  const { data: students, isLoading: loading } = useQuery({
    queryKey: ["students", queryOptions],
    queryFn: () => studentService.getAllStudent(queryOptions),
    staleTime: Infinity
  })

  const onChangePagination: PaginationProps["onChange"] = (page: number, size: number) => {
    setQueryOptions((prev) => ({ ...prev, currentPage: page, pageSize: size }))
  }

  const deleteManyStudentMutation = (identityList: Array<IdentityMap>) => {
    return studentService.deleteManyStudentPersonalInfo(identityList)
  }

  const handleRowSelection = () => {
    setOpenDeleteConfirm(true)
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
        </div>
        <div className="student-filter-search-container">
          <div>
            <Button type="primary" onClick={handleRowSelection} disabled={!hasSelected} loading={loading} danger>
              Delete
            </Button>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
          </div>
          <SearchBar
            onSearch={(query) =>
              setQueryOptions((prev) => ({
                ...prev,
                searchQuery: query,
                currentPage: 1
              }))
            }
            className="student-search-bar"
            placeholder="Search identity or name..."
          />
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
