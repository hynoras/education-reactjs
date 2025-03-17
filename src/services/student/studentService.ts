import { PaginatedStudentList, StudentDetail } from "models/dtos/student/studentModel"
import { api } from "utils/api"
import { store } from "utils/store"

class StudentService {
  async getAllStudent(options?: {
    currentPage?: number
    pageSize?: number
    sortBy?: string
    sortOrder?: string
    gender?: string
    major?: string
    department?: string
    searchQuery?: string
  }): Promise<PaginatedStudentList | any> {
    try {
      const token = store.getState().auth.token
      const response = await api.get("/admin/students", {
        params: {
          currentPage: options?.currentPage ? options.currentPage - 1 : 0,
          pageSize: options?.pageSize ?? 10,
          sortBy: options?.sortBy ?? "identity",
          sortOrder: options?.sortOrder,
          gender: options?.gender,
          major: options?.major,
          department: options?.department,
          search: options?.searchQuery ?? ""
        },
        headers: { Authorization: `Bearer ${token}` }
      })
      return response
    } catch (error) {
      console.error("Error fetching students:", error)
      return { data: { content: [], totalElements: 0 } }
    }
  }

  async getStudentDetail(options?: { pathParams?: any }): Promise<StudentDetail | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.get(`/admin/students/${options?.pathParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      console.error("Error fetching student detail:", error)
      return
    }
  }
}

const studentService = new StudentService()
export default studentService
