import axios from "axios"

const DEVELOPMENT_API = "http://localhost:8080/api"

const changeURL = (stage: string): string | undefined => {
  switch (stage) {
    case "development":
      return DEVELOPMENT_API
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
