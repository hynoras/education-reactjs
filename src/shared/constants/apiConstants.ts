export const DEVELOPMENT: string = "http://localhost:8000/api"
export const PRODUCTION_RAILWAY: string = "https://education-spring-boot-production.up.railway.app/api"
export const PRODUCTION_KOYEB: string = "https://fierce-lin-quang-f03e4fce.koyeb.app/api"
export const ADMIN: string = "/admin"
export const BEARER: string = "Bearer"
export const CONTENT_TYPE: string = "Content-Type"
export const APPLICATION_JSON: string = "application/json"
export const MULTIPART_FORM_DATA: string = "multipart/form-data"
export const DEFAULT_PAGE_SIZE: number = 10
export const DEFAULT_CURRENT_PAGE: number = 0
export const HEADER_WITH_AUTHORIZATION = (token: string | null) => {
  return { headers: { Authorization: `${BEARER} ${token}` } }
}
export const AUTHORIZATION = (token: string | null) => {
  return { Authorization: `${BEARER} ${token}` }
}

export const CONTENT_TYPE_APP_JSON_AUTH = (token: string | null) => {
  return {
    "Content-Type": APPLICATION_JSON,
    Authorization: `${BEARER} ${token}`
  }
}

export const CONTENT_TYPE_FORM_DATA_AUTH = (token: string | null) => {
  return {
    "Content-Type": MULTIPART_FORM_DATA,
    Authorization: `${BEARER} ${token}`
  }
}
