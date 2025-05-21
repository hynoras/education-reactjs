import { ParentID, ParentInfoForm } from "parent/models/dtos/parent"
import { api } from "shared/utils/api"
import { store } from "shared/utils/store"
import { API } from "shared/constants/apiConstants"
import { DefaultResponse } from "shared/models/dtos/defaultResponse"
import { PARENT } from "parent/constants/parentConstants"

class ParentService {
  async upsertParentInfo(payload: Array<ParentInfoForm>): Promise<DefaultResponse | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.post(PARENT.ROUTE.API.BASE, payload, {
        headers: API.HEADER.AUTHORIZATION(token)
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
      const response = await api.delete(PARENT.ROUTE.API.BASE, {
        headers: API.HEADER.AUTHORIZATION(token),
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
