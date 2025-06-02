import axios from "axios"
import { API } from "shared/constants/apiConstants"

const changeURL = (stage: string): string | undefined => {
  switch (stage) {
    case "development":
      return API.PREFIX.DEV
    case "production_railway":
      return API.PREFIX.PROD.RAILWAY
    case "production_koyeb":
      return API.PREFIX.PROD.KOYEB
  }
}

export const api = axios.create({
  baseURL: changeURL("development"),
  withCredentials: true
})

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `${API.HEADER.BEARER} ${token}`
  } else {
    delete api.defaults.headers.common["Authorization"]
  }
}
