import { jwtDecode } from "jwt-decode"

export const decodeToken = (token: string) => {
  const decoded = jwtDecode(token)
  return decoded
}

export const isTokenExpired = (decodedToken: any): boolean => {
  if (!decodedToken || !decodedToken.exp) return true
  const currentTime = Math.floor(Date.now() / 1000)
  return decodedToken.exp <= currentTime
}
