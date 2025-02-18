import axios from "axios"
import { LoginRequest, LoginResponse } from "models/auth/authModel"

const API_URL = "http://localhost:8080/api/auth"

class AuthService {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/login`, payload)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed")
    }
  }
}

export default new AuthService()
