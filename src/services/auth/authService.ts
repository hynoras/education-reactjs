import { LoginRequest, UserResponse } from "models/auth/authModel"
import { api } from "utils/axios"

class AuthService {
  async login(payload: LoginRequest): Promise<void> {
    await api.post("/auth/login", payload)
  }

  async logout(): Promise<void> {
    await api.post("/logout")
  }

  async checkAuth(): Promise<UserResponse | null> {
    try {
      const response = await api.get("/auth/get-user")
      return response.data
    } catch (error: any) {
      if (error.response?.status === 401) {
        window.location.href = "/"
      }
      return null
    }
  }
}

export default new AuthService()
