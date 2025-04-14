import { BEARER } from "constants/api"
import { MajorNameList } from "models/dtos/student/major"
import { api } from "utils/api"
import { store } from "utils/store"

class MajorService {
  async getAllMajorName(): Promise<MajorNameList | any> {
    try {
      const token = store.getState().auth.token
      const response = await api.get("admin/majors", {
        headers: { Authorization: `${BEARER} ${token}` }
      })
      return response.data
    } catch (error) {
      console.error("Error fetching majors:", error)
      return []
    }
  }
}

const majorService = new MajorService()
export default majorService
