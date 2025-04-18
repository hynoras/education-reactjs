import { ParentInfoForm } from "models/dtos/student/studentDetail"
import { api } from "utils/api"
import { store } from "utils/store"
import { BEARER } from "constants/api"
import { DefaultResponse } from "models/dtos/defaultResponse"

class ParentService {
  async updateParentInfo(payload: Array<ParentInfoForm>): Promise<DefaultResponse | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.put(`/admin/parent`, payload, {
        headers: { Authorization: `${BEARER} ${token}` }
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
