import { BEARER } from "shared/constants/api"
import { LoginRequest, UserResponse } from "auth/models/dtos/authModel"
import { api } from "shared/utils/api"

class AuthService {
  async login(payload: LoginRequest): Promise<string | any> {
    const response = await api.post("/auth/login", payload, { headers: { Authorization: `` } })
    return response.data.token
  }

  async checkAuth(token: string): Promise<UserResponse | any> {
    try {
      const response = await api.get("/auth/get-user", {
        headers: { Authorization: `${BEARER} ${token}` }
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
