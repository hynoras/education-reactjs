import { MajorNameList } from "major/models/dtos/major"
import { api } from "shared/utils/axiosUtils"
import { MAJOR } from "major/constants/majorConstants"

class MajorService {
  async getAllMajorName(): Promise<MajorNameList | any> {
    try {
      const response = await api.get(MAJOR.ROUTE.API.BASE_PLURAL)
      return response.data
    } catch (error) {
      console.error("Error fetching majors:", error)
      throw error
    }
  }
}

const majorService = new MajorService()
export default majorService
