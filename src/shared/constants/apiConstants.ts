export const API = {
  PREFIX: {
    DEV: "http://localhost:8000/api",
    PROD: {
      RAILWAY: "https://education-spring-boot-production.up.railway.app/api",
      KOYEB: "https://fierce-lin-quang-f03e4fce.koyeb.app/api"
    }
  },
  HEADER: {
    BEARER: "Bearer",
    CONTENT_TYPE: "Content-Type",
    APPLICATION_JSON: "application/json",
    MULTIPART_FORM_DATA: "multipart/form-data",
    AUTHORIZATION: (token: string | null) => {
      return { Authorization: `${API.HEADER.BEARER} ${token}` }
    },
    APP_JSON_AUTH: (token: string | null) => {
      return {
        "Content-Type": API.HEADER.APPLICATION_JSON,
        Authorization: `${API.HEADER.BEARER} ${token}`
      }
    },
    FORM_DATA_AUTH: (token: string | null) => {
      return {
        "Content-Type": API.HEADER.MULTIPART_FORM_DATA,
        Authorization: `${API.HEADER.BEARER} ${token}`
      }
    }
  },
  PARAMS: {
    PAGINATION: {
      DEFAULT_PAGE_SIZE: 10,
      DEFAULT_CURRENT_PAGE: 0,
      DEFAULT_CURRENT_PAGE_ANTD: 1
    },
    SORT: {
      ORDER_ASC: "asc",
      ORDER_DESC: "desc"
    }
  }
}
