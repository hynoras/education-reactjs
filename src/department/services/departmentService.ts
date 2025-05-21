import { API } from "shared/constants/apiConstants"
import { DepartmentNameList } from "department/models/dtos/department"
import { api } from "shared/utils/api"
import { store } from "shared/utils/store"
import { DEPARTMENT } from "department/constants/departmentConstants"

class DepartmentService {
  async getAllDepartmentName(): Promise<DepartmentNameList | any> {
    try {
      const token = store.getState().auth.token
      const response = await api.get(DEPARTMENT.ROUTE.API.BASE_PLURAL, {
        headers: API.HEADER.AUTHORIZATION(token)
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
