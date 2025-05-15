export const STUDENT = {
  ROUTES: {
    API: {
      BASE: "/student",
      BASE_PLURAL: "/students",
      ID: "/identity",
      AVATAR: "/avatar",
      BY_ID: (identity: string | undefined) => `/${identity}`,
      AVATAR_BY_ID: (identity: string | undefined) => `${STUDENT.ROUTES.API.AVATAR}/${identity}`,
      ID_BY_USERNAME: (username: string) => `${STUDENT.ROUTES.API.ID}/${username}`
    },
    NAVIGATION: {
      EDIT_STUDENT_PERSONAL_INFO: (identity: string | undefined) => `/admin/student/${identity}/edit`,
      VIEW_STUDENT_DETAIL: (identity: string | undefined) => `/admin/student/${identity}/view`
    }
  }
}
