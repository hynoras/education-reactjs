export const STUDENT = {
  ROUTE: {
    API: {
      BASE: "/student",
      BASE_PLURAL: "/students",
      ID: "/student_id",
      AVATAR: "/avatar",
      BY_ID: (studentId: string | undefined) => `/${studentId}`,
      AVATAR_BY_ID: (studentId: string | undefined) => `${STUDENT.ROUTE.API.AVATAR}/${studentId}`,
      ID_BY_USERNAME: (username: string) => `${STUDENT.ROUTE.API.ID}/${username}`
    },
    NAVIGATION: {
      VIEW_STUDENT_LIST: "/admin/student",
      EDIT_STUDENT_PERSONAL_INFO: (studentId: string | undefined) => `/admin/student/${studentId}/edit`,
      VIEW_STUDENT_DETAIL: (studentId: string | undefined) => `/student/${studentId}/view`
    }
  },
  KEY: {
    ANTD: {
      STUDENT_ID: "studentId"
    },
    REACT_QUERY: {
      STUDENT_ID: "student-id",
      STUDENT_DETAIL: "student-detail"
    },
    GENERIC: {
      STUDENT_ID: "student_id",
      STUDENT: "student",
      STUDENT_PLURAL: "students"
    }
  }
}
