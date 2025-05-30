import { LoginRequest, UserResponse } from "auth/models/dtos/authModel"
import { api } from "shared/utils/axiosUtils"
import { AUTH } from "auth/constants/authConstants"
import { DefaultResponse } from "shared/models/dtos/defaultResponse"

class AuthService {
  async login(payload: LoginRequest): Promise<DefaultResponse | undefined> {
    try {
      const response = await api.post(AUTH.ROUTE.API.BASE + AUTH.ROUTE.API.LOGIN, payload)
      return response.data
    } catch (error) {
      console.error("An error occurred while logging in:", error)
      throw error
    }
  }

  async getAccountDetail(): Promise<UserResponse | undefined> {
    try {
      const response = await api.get(AUTH.ROUTE.API.BASE + AUTH.ROUTE.API.ACCOUNT)
      return response.data
    } catch (error) {
      console.error("Failed to check auth: ", error)
      throw error
    }
  }
}

const authService = new AuthService()
export default authService
