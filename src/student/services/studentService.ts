import { IdentityMap, StudentDetail, StudentDetailForm } from "student/models/dtos/studentDetail"
import { Student } from "student/models/domains/student"
import { api } from "shared/utils/api"
import { store } from "shared/utils/store"
import { PaginatedStudentList } from "student/models/dtos/studentList"
import {
  AUTHORIZATION,
  CONTENT_TYPE_APP_JSON_AUTH,
  CONTENT_TYPE_FORM_DATA_AUTH,
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE
} from "shared/constants/apiConstants"
import { DefaultResponse } from "shared/models/dtos/defaultResponse"
import { AVATAR_BY_ID, BASE, BASE_PLURAL, BY_ID, ID_BY_USERNAME } from "student/constants/studentMappings"
import { IDENTITY } from "student/constants/studentColumns"
import { EMPTY_ARRAY, EMPTY_STRING } from "shared/constants/genericValues"

class StudentService {
  async getAllStudent(options?: {
    currentPage?: number
    pageSize?: number
    sortBy?: string
    sortOrder?: string
    gender?: string
    major?: string
    department?: string
    searchQuery?: string
  }): Promise<PaginatedStudentList | any> {
    try {
      const token = store.getState().auth.token
      const response = await api.get(BASE_PLURAL, {
        params: {
          currentPage: options?.currentPage ? options.currentPage - 1 : DEFAULT_CURRENT_PAGE,
          pageSize: options?.pageSize ?? DEFAULT_PAGE_SIZE,
          sortBy: options?.sortBy ?? IDENTITY,
          sortOrder: options?.sortOrder,
          gender: options?.gender,
          major: options?.major,
          department: options?.department,
          search: options?.searchQuery ?? EMPTY_STRING
        },
        headers: AUTHORIZATION(token)
      })
      return response.data
    } catch (error) {
      console.error("Error fetching students:", error)
      return { data: { content: EMPTY_ARRAY, totalElements: 0 } }
    }
  }

  async getStudentDetail(identity: string | undefined): Promise<Student | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.get<StudentDetail>(BASE + BY_ID(identity), {
        headers: AUTHORIZATION(token)
      })
      const studentDetail = response.data
      return Student.fromDTO(studentDetail)
    } catch (error) {
      console.error("Error fetching student detail:", error)
      return
    }
  }

  async getIdentityByUsername(username: string): Promise<string | undefined> {
    try {
      const response = await api.get<string>(BASE + ID_BY_USERNAME(username))
      return response.data
    } catch (error) {
      console.error("Error fetching student detail:", error)
      return
    }
  }

  async addStudentPersonalInfo(payload: StudentDetailForm): Promise<DefaultResponse | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.post(BASE, payload, {
        headers: AUTHORIZATION(token)
      })
      return response.data
    } catch (error) {
      console.error("Error deleting student detail:", error)
      return
    }
  }

  async deleteStudentPersonalInfo(identity: string | undefined): Promise<DefaultResponse | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.delete(BASE + BY_ID(identity), {
        headers: AUTHORIZATION(token)
      })
      return response.data
    } catch (error) {
      console.error("Error deleting student detail:", error)
      return
    }
  }

  async deleteManyStudentPersonalInfo(payload: Array<IdentityMap>): Promise<DefaultResponse | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.delete(BASE_PLURAL, {
        headers: CONTENT_TYPE_APP_JSON_AUTH(token),
        data: payload
      })
      return response.data
    } catch (error) {
      console.error("Error deleting student detail:", error)
      return
    }
  }

  async updateStudentPersonalInfo(studentId: any, payload: StudentDetailForm): Promise<DefaultResponse | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.put(BASE + BY_ID(studentId), payload, {
        headers: AUTHORIZATION(token)
      })
      return response.data
    } catch (error) {
      console.error("Error updating student detail:", error)
      return
    }
  }

  async updateStudentAvatar(studentId: string | undefined, avatar: FormData): Promise<DefaultResponse | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.put(BASE + AVATAR_BY_ID(studentId), avatar, {
        headers: CONTENT_TYPE_FORM_DATA_AUTH(token)
      })
      return response.data
    } catch (error) {
      console.error("Error updating student avatar:", error)
      return
    }
  }
}

const studentService = new StudentService()
export default studentService
