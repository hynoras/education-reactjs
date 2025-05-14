import { ParentID, ParentInfoForm } from "parent/models/dtos/parent"
import { api } from "shared/utils/api"
import { store } from "shared/utils/store"
import { BEARER } from "shared/constants/apiConstants"
import { DefaultResponse } from "shared/models/dtos/defaultResponse"

class ParentService {
  async upsertParentInfo(payload: Array<ParentInfoForm>): Promise<DefaultResponse | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.post(`/parent`, payload, {
        headers: { Authorization: `${BEARER} ${token}` }
      })
      return response.data
    } catch (error) {
      console.error("Error updating student detail:", error)
      return
    }
  }

  async deleteParentInfo(payload: Array<ParentID>): Promise<DefaultResponse | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.delete(`/parent`, {
        headers: { Authorization: `${BEARER} ${token}` },
        data: payload
      })
      return response.data
    } catch (error) {
      console.error("Error updating student detail:", error)
      return
    }
  }
}

const parentService = new ParentService()
export default parentService
