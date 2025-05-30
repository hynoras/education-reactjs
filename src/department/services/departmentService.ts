import { DepartmentNameList } from "department/models/dtos/department"
import { api } from "shared/utils/axiosUtils"
import { DEPARTMENT } from "department/constants/departmentConstants"

class DepartmentService {
  async getAllDepartmentName(): Promise<DepartmentNameList | any> {
    try {
      const response = await api.get(DEPARTMENT.ROUTE.API.BASE_PLURAL)
      return response.data
    } catch (error) {
      console.error("Error fetching majors:", error)
      throw error
    }
  }
}

const departmentService = new DepartmentService()
export default departmentService
