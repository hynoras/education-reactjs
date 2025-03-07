import { LoginRequest, UserResponse } from "models/auth/authModel"
import { api } from "utils/api"

class AuthService {
  async login(payload: LoginRequest): Promise<string | any> {
    const response = await api.post("/auth/login", payload, { headers: { Authorization: `` } })
    return response.data.token
  }

  async checkAuth(token: string): Promise<UserResponse | any> {
    try {
      const response = await api.get("/auth/get-user", {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error: any) {
      console.log("Failed to check auth: ", error)
      return null
    }
  }
}

const authService = new AuthService()
export default authService
