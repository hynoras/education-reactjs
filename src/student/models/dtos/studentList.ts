import { ParamsOptions } from "shared/models/dtos/queryOptions"

export interface StudentList {
  student_id: string | undefined
  full_name: string
  birth_date: string
  gender: string
  major_name: string
  department_name: string
}

export interface PaginatedStudentList {
  content: StudentList[]
  total_element: number
  total_page: number
  last: boolean
}

export interface StudentListQueryOptions extends ParamsOptions {
  gender: string
  major: string
  department: string
}
