import { StudentIdMap, StudentDetail, StudentDetailForm } from "student/models/dtos/studentDetail"
import { Student } from "student/models/domains/student"
import { api } from "shared/utils/axiosUtils"
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
      const response = await api.get(STUDENT.ROUTE.API.BASE_PLURAL, {
        params: {
          currentPage: options?.currentPage
            ? options.currentPage - API.PARAMS.PAGINATION.DEFAULT_CURRENT_PAGE_ANTD
            : API.PARAMS.PAGINATION.DEFAULT_CURRENT_PAGE,
          pageSize: options?.pageSize ?? API.PARAMS.PAGINATION.DEFAULT_PAGE_SIZE,
          sortBy: options?.sortBy ?? STUDENT.KEY.ANTD.STUDENT_ID,
          sortOrder: options?.sortOrder,
          gender: options?.gender,
          major: options?.major,
          department: options?.department,
          search: options?.searchQuery ?? GENERIC.EMPTY_VALUE.STRING
        }
      })
      return response.data
    } catch (error) {
      console.error("Error fetching students:", error)
      throw error
    }
  }

  async getStudentDetail(studentId: string | undefined): Promise<Student | undefined> {
    try {
      const response = await api.get<StudentDetail>(STUDENT.ROUTE.API.BASE + STUDENT.ROUTE.API.BY_ID(studentId))
      const studentDetail = response.data
      return Student.fromDTO(studentDetail)
    } catch (error) {
      console.error("Error fetching student detail:", error)
      throw error
    }
  }

  async getStudentIdByUsername(username: string): Promise<string | undefined> {
    try {
      const response = await api.get<string>(STUDENT.ROUTE.API.BASE + STUDENT.ROUTE.API.ID_BY_USERNAME(username))
      return response.data
    } catch (error) {
      console.error("Error fetching student detail:", error)
      throw error
    }
  }

  async addStudentPersonalInfo(payload: StudentDetailForm): Promise<DefaultResponse | undefined> {
    try {
      const response = await api.post(STUDENT.ROUTE.API.BASE, payload)
      return response.data
    } catch (error) {
      console.error("Error deleting student detail:", error)
      throw error
    }
  }

  async deleteStudentPersonalInfo(studentId: string | undefined): Promise<DefaultResponse | undefined> {
    try {
      const response = await api.delete(STUDENT.ROUTE.API.BASE + STUDENT.ROUTE.API.BY_ID(studentId))
      return response.data
    } catch (error) {
      console.error("Error deleting student detail:", error)
      throw error
    }
  }

  async deleteManyStudentPersonalInfo(payload: Array<StudentIdMap>): Promise<DefaultResponse | undefined> {
    try {
      const response = await api.delete(STUDENT.ROUTE.API.BASE_PLURAL, {
        data: payload
      })
      return response.data
    } catch (error) {
      console.error("Error deleting student detail:", error)
      throw error
    }
  }

  async updateStudentPersonalInfo(studentId: any, payload: StudentDetailForm): Promise<DefaultResponse | undefined> {
    try {
      const response = await api.put(STUDENT.ROUTE.API.BASE + STUDENT.ROUTE.API.BY_ID(studentId), payload)
      return response.data
    } catch (error) {
      console.error("Error updating student detail:", error)
      throw error
    }
  }

  async updateStudentAvatar(studentId: string | undefined, avatar: FormData): Promise<DefaultResponse | undefined> {
    try {
      const response = await api.put(STUDENT.ROUTE.API.BASE + STUDENT.ROUTE.API.AVATAR_BY_ID(studentId), avatar)
      return response.data
    } catch (error) {
      console.error("Error updating student avatar:", error)
      throw error
    }
  }
}

const studentService = new StudentService()
export default studentService
