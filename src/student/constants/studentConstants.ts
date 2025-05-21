export const STUDENT = {
  ROUTE: {
    API: {
      BASE: "/student",
      BASE_PLURAL: "/students",
      ID: "/identity",
      AVATAR: "/avatar",
      BY_ID: (identity: string | undefined) => `/${identity}`,
      AVATAR_BY_ID: (identity: string | undefined) => `${STUDENT.ROUTE.API.AVATAR}/${identity}`,
      ID_BY_USERNAME: (username: string) => `${STUDENT.ROUTE.API.ID}/${username}`
    },
    NAVIGATION: {
      EDIT_STUDENT_PERSONAL_INFO: (identity: string | undefined) => `/admin/student/${identity}/edit`,
      VIEW_STUDENT_DETAIL: (identity: string | undefined) => `/admin/student/${identity}/view`
    }
  },
  KEY: {
    IDENTITY: "identity",
    STUDENT: "student",
    STUDENT_PLURAL: "students",
    STUDENT_DETAIL: "student-detail"
  }
}
