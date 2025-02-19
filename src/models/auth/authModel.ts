export interface LoginRequest {
  username: string
  password: string
}

export interface UserResponse {
  username: string
  roles: string[]
}
