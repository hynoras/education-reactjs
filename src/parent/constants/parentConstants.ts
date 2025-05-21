export const PARENT = {
  ROUTE: {
    API: {
      BASE: "/parent"
    },
    NAVIGATION: {
      EDIT_PARENT_INFO: (studentId: string | undefined) => `/admin/student/parent/${studentId}/edit`
    }
  }
}
