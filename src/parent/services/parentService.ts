import { ParentID, ParentInfoFormDto } from "parent/models/dtos/parent"
import { api } from "shared/utils/axiosUtils"
import { DefaultResponse } from "shared/models/dtos/defaultResponse"
import { PARENT } from "parent/constants/parentConstants"

class ParentService {
  async upsertParentInfo(payload: Array<ParentInfoFormDto>): Promise<DefaultResponse | undefined> {
    try {
      const response = await api.post(PARENT.ROUTE.API.BASE, payload)
      return response.data
    } catch (error) {
      console.error("Error updating student detail:", error)
      throw error
    }
  }

  async deleteParentInfo(payload: Array<ParentID>): Promise<DefaultResponse | undefined> {
    try {
      const response = await api.delete(PARENT.ROUTE.API.BASE, {
        data: payload
      })
      return response.data
    } catch (error) {
      console.error("Error updating student detail:", error)
      throw error
    }
  }
}

const parentService = new ParentService()
export default parentService
