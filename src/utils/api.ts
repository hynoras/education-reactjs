import axios from "axios"
import { store } from "utils/store"

const DEVELOPMENT_API = "http://localhost:8080/api"
const PRODUCTION_RAILWAY = "https://education-spring-boot-production.up.railway.app/api"

const changeURL = (stage: string): string | undefined => {
  switch (stage) {
    case "development":
      return DEVELOPMENT_API
    case "production_railway":
      return PRODUCTION_RAILWAY
  }
}

export const api = axios.create({
  baseURL: changeURL("development")
})

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common["Authorization"]
  }
}
