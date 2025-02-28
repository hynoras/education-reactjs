import { PaginatedStudentList } from "models/admin/studentModel"
import { api } from "utils/api"

class StudentService {
  async getAllStudent(options?: {
    currentPage?: number
    pageSize?: number
    sortBy?: string
    searchQuery?: string
  }): Promise<PaginatedStudentList | any> {
    try {
      const response = await api.get("/admin/students", {
        params: {
          currentPage: options?.currentPage ? options.currentPage - 1 : 0,
          pageSize: options?.pageSize ?? 10,
          sortBy: options?.sortBy ?? "identity",
          search: options?.searchQuery ?? ""
        }
      })
      return response
    } catch (error) {
      console.error("Error fetching students:", error)
      return { data: { content: [], totalElements: 0 } }
    }
  }
}

const studentService = new StudentService()
export default studentService
