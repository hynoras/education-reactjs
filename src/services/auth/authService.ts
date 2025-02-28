import { LoginRequest, UserResponse } from "models/auth/authModel"
import { api } from "utils/api"

class AuthService {
  async login(payload: LoginRequest): Promise<void> {
    await api.post("/auth/login", payload)
  }

  async logout(): Promise<void> {
    await api.post("/logout")
  }

  async checkAuth(): Promise<UserResponse | any> {
    try {
      const response = await api.get("/auth/get-user")
      return response.data
    } catch (error: any) {
      if (error.response?.status === 401) {
        return "unauthorized"
      }
      return null
    }
  }
}

export default new AuthService()
