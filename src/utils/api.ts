import axios from "axios"
import { BEARER, DEVELOPMENT, PRODUCTION_KOYEB, PRODUCTION_RAILWAY } from "constants/api"


const changeURL = (stage: string): string | undefined => {
  switch (stage) {
    case "development":
      return DEVELOPMENT
    case "production_railway":
      return PRODUCTION_RAILWAY
    case "production_koyeb":
        return PRODUCTION_KOYEB
  }
}

export const api = axios.create({
  baseURL: changeURL("development")
})

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `${BEARER} ${token}`
  } else {
    delete api.defaults.headers.common["Authorization"]
  }
}
