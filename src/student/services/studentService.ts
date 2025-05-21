import { IdentityMap, StudentDetail, StudentDetailForm } from "student/models/dtos/studentDetail"
import { Student } from "student/models/domains/student"
import { api } from "shared/utils/api"
import { store } from "shared/utils/store"
import { PaginatedStudentList } from "student/models/dtos/studentList"
import { DefaultResponse } from "shared/models/dtos/defaultResponse"
import { STUDENT } from "student/constants/studentConstants"
import { API } from "shared/constants/apiConstants"
import { GENERIC } from "shared/constants/genericValues"

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
      const response = await api.get(STUDENT.ROUTE.API.BASE_PLURAL, {
        params: {
          currentPage: options?.currentPage
            ? options.currentPage - API.PARAMS.PAGINATION.DEFAULT_CURRENT_PAGE_ANTD
            : API.PARAMS.PAGINATION.DEFAULT_CURRENT_PAGE,
          pageSize: options?.pageSize ?? API.PARAMS.PAGINATION.DEFAULT_PAGE_SIZE,
          sortBy: options?.sortBy ?? STUDENT.KEY.IDENTITY,
          sortOrder: options?.sortOrder,
          gender: options?.gender,
          major: options?.major,
          department: options?.department,
          search: options?.searchQuery ?? GENERIC.EMPTY_VALUE.STRING
        },
        headers: API.HEADER.AUTHORIZATION(token)
      })
      return response.data
    } catch (error) {
      console.error("Error fetching students:", error)
      return { data: { content: GENERIC.EMPTY_VALUE.ARRAY, totalElements: GENERIC.EMPTY_VALUE.ZERO } }
    }
  }

  async getStudentDetail(identity: string | undefined): Promise<Student | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.get<StudentDetail>(STUDENT.ROUTE.API.BASE + STUDENT.ROUTE.API.BY_ID(identity), {
        headers: API.HEADER.AUTHORIZATION(token)
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
      const response = await api.get<string>(STUDENT.ROUTE.API.BASE + STUDENT.ROUTE.API.ID_BY_USERNAME(username))
      return response.data
    } catch (error) {
      console.error("Error fetching student detail:", error)
      return
    }
  }

  async addStudentPersonalInfo(payload: StudentDetailForm): Promise<DefaultResponse | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.post(STUDENT.ROUTE.API.BASE, payload, {
        headers: API.HEADER.AUTHORIZATION(token)
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
      const response = await api.delete(STUDENT.ROUTE.API.BASE + STUDENT.ROUTE.API.BY_ID(identity), {
        headers: API.HEADER.AUTHORIZATION(token)
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
      const response = await api.delete(STUDENT.ROUTE.API.BASE_PLURAL, {
        headers: API.HEADER.APP_JSON_AUTH(token),
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
      const response = await api.put(STUDENT.ROUTE.API.BASE + STUDENT.ROUTE.API.BY_ID(studentId), payload, {
        headers: API.HEADER.AUTHORIZATION(token)
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
      const response = await api.put(STUDENT.ROUTE.API.BASE + STUDENT.ROUTE.API.AVATAR_BY_ID(studentId), avatar, {
        headers: API.HEADER.FORM_DATA_AUTH(token)
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
