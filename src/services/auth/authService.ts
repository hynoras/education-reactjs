import axios from "axios"
import { LoginRequest, UserResponse } from "models/auth/authModel"

const API_URL = "http://localhost:8080/api/auth"

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

class AuthService {
  async login(payload: LoginRequest): Promise<void> {
    await api.post("/login", payload)
  }

  async logout(): Promise<void> {
    await api.post("/logout")
  }

  async checkAuth(): Promise<UserResponse | null> {
    try {
      const response = await api.get("/get-user")
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
