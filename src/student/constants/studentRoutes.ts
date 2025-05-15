export const BASE: string = "/student"
export const BASE_PLURAL: string = "/students"
export const ID: string = "/identity"
export const AVATAR: string = "/avatar"
export const BY_ID = (identity: string | undefined) => {
  return `/${identity}`
}
export const AVATAR_BY_ID = (identity: string | undefined) => {
  return `${AVATAR}/${identity}`
}
export const ID_BY_USERNAME = (username: string) => {
  return `${ID}/${username}`
}
export const EDIT_STUDENT_PERSONAL_INFO_ROUTE = (identity: string | undefined) => {
  return `/admin/student/${identity}/edit`
}
export const VIEW_STUDENT_DETAIL_ROUTE = (identity: string | undefined) => {
  return `/admin/student/${identity}/view`
}
