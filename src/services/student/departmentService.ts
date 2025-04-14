import { BEARER } from "constants/api"
import { DepartmentNameList } from "models/dtos/student/department"
import { api } from "utils/api"
import { store } from "utils/store"

class DepartmentService {
  async getAllDepartmentName(): Promise<DepartmentNameList | any> {
    try {
      const token = store.getState().auth.token
      const response = await api.get("admin/departments", {
        headers: { Authorization: `${BEARER} ${token}` }
      })
      return response.data
    } catch (error) {
      console.error("Error fetching majors:", error)
      return []
    }
  }
}

const departmentService = new DepartmentService()
export default departmentService
