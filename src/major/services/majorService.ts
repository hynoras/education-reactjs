import { MajorNameList } from "major/models/dtos/major"
import { api } from "shared/utils/api"
import { store } from "shared/utils/store"
import { MAJOR } from "major/constants/majorConstants"
import { API } from "shared/constants/apiConstants"

class MajorService {
  async getAllMajorName(): Promise<MajorNameList | any> {
    try {
      const token = store.getState().auth.token
      const response = await api.get(MAJOR.ROUTE.API.BASE_PLURAL, {
        headers: API.HEADER.AUTHORIZATION(token)
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
