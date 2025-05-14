import { Pagination } from "antd"

type StudentListPaginationProps = {
  total: number | undefined
  queryOptions: {
    currentPage: number
    pageSize: number
    sortBy: string
    sortOrder: string
    gender: string
    major: string
    department: string
  }
  onChangePagination: ((page: number, pageSize: number) => void) | undefined
}

const StudentListPagination: React.FC<StudentListPaginationProps> = ({ total, queryOptions, onChangePagination }) => {
  return (
    <>
      <Pagination
        className="student-table-pagination"
        align="end"
        defaultCurrent={1}
        current={queryOptions.currentPage}
        total={total}
        pageSize={queryOptions.pageSize}
        onChange={onChangePagination}
        showQuickJumper
        showTotal={(total) => `Total ${total} students`}
      />
    </>
  )
}

export default StudentListPagination
