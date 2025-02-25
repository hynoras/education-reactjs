import axios from "axios"

const DEVELOPMENT_API = "http://localhost:8080/api"

const changeURL = (stage: string) => {
  switch (stage) {
    case "development":
      return DEVELOPMENT_API
  }
}

export const api = axios.create({
  baseURL: changeURL("development"),
  withCredentials: true
})
