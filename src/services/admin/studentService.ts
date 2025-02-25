import { StudentList } from "models/admin/studentModel"
import { api } from "utils/axios"

class StudentService {
  async getAllStudent(): Promise<StudentList[]> {
    try {
      const response = await api.get("/admin/students")
      return response.data
    } catch (error: any) {
      console.error("Error fetching students:", error)
      return []
    }
  }
}

export default new StudentService()
