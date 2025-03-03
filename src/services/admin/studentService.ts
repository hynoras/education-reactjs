import { PaginatedStudentList } from "models/admin/studentModel"
import { api } from "utils/api"
import { store } from "utils/store"

class StudentService {
  async getAllStudent(options?: {
    currentPage?: number
    pageSize?: number
    sortBy?: string
    sortOrder?: string
    filterBy?: string
    filterValue?: string
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
          filterBy: options?.filterBy,
          filterValue: options?.filterValue,
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
}

const studentService = new StudentService()
export default studentService
