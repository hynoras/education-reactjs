import { PaginatedStudentList } from "models/admin/studentModel"
import { api } from "utils/api"

class StudentService {
  async getAllStudent(
    currentPage: number = 1,
    pageSize: number = 10,
    sortBy: string = "identity"
  ): Promise<PaginatedStudentList | any> {
    try {
      const response = await api.get(
        `/admin/students?currentPage=${currentPage - 1}&pageSize=${pageSize}&sortBy=${sortBy}`
      )
      return response.data
    } catch (error: any) {
      console.error("Error fetching students:", error)
      return []
    }
  }
}

export default new StudentService()
