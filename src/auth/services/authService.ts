import { API } from "shared/constants/apiConstants"
import { LoginRequest, UserResponse } from "auth/models/dtos/authModel"
import { api } from "shared/utils/api"
import { AUTH } from "auth/constants/authConstants"

class AuthService {
  async login(payload: LoginRequest): Promise<string | any> {
    const response = await api.post(AUTH.ROUTE.API.BASE + AUTH.ROUTE.API.LOGIN, payload, {
      headers: { Authorization: `` }
    })
    return response.data.token
  }

  async checkAuth(token: string): Promise<UserResponse | any> {
    try {
      const response = await api.get(AUTH.ROUTE.API.BASE + AUTH.ROUTE.API.ACCOUNT, {
        headers: API.HEADER.AUTHORIZATION(token)
      })
      return response.data
    } catch (error: any) {
      console.error("Failed to check auth: ", error)
      return null
    }
  }
}

const authService = new AuthService()
export default authService
