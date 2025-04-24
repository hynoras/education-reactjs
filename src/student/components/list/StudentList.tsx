import "./style.scss"
import { useState } from "react"
import { Pagination, PaginationProps } from "antd"
import studentService from "student/services/student/studentService"
import SearchBar from "shared/components/search/SearchBar"
import Title from "shared/themes/text/Text"
import StudentListTable from "./StudentListTable"
import { useQuery } from "@tanstack/react-query"

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

  const { data: students, isLoading: loading } = useQuery({
    queryKey: ["students", queryOptions],
    queryFn: () => studentService.getAllStudent(queryOptions),
    staleTime: Infinity
  })

  const onChangePagination: PaginationProps["onChange"] = (page: number, size: number) => {
    setQueryOptions((prev) => ({ ...prev, currentPage: page, pageSize: size }))
  }

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
        <StudentListTable students={students?.content || []} loading={loading} setQueryOptions={setQueryOptions} />
        <Pagination
          className="student-table-pagination"
          align="end"
          defaultCurrent={1}
          current={queryOptions.currentPage}
          total={students?.total_element || 0}
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
