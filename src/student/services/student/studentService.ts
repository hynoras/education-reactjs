import { StudentDetail, StudentDetailForm } from "student/models/dtos/student/studentDetail"
import { Student } from "student/models/domains/student"
import { api } from "shared/utils/api"
import { store } from "shared/utils/store"
import { PaginatedStudentList } from "student/models/dtos/student/studentList"
import { BEARER } from "shared/constants/api"
import { DefaultResponse } from "student/models/dtos/defaultResponse"

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
      const response = await api.get("/admin/students", {
        params: {
          currentPage: options?.currentPage ? options.currentPage - 1 : 0,
          pageSize: options?.pageSize ?? 10,
          sortBy: options?.sortBy ?? "identity",
          sortOrder: options?.sortOrder,
          gender: options?.gender,
          major: options?.major,
          department: options?.department,
          search: options?.searchQuery ?? ""
        },
        headers: { Authorization: `${BEARER} ${token}` }
      })
      return response
    } catch (error) {
      console.error("Error fetching students:", error)
      return { data: { content: [], totalElements: 0 } }
    }
  }

  async getStudentDetail(identity: string | undefined): Promise<Student | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.get<StudentDetail>(`/admin/student/${identity}`, {
        headers: { Authorization: `${BEARER} ${token}` }
      })
      const studentDetail = response.data
      return Student.fromDTO(studentDetail)
    } catch (error) {
      console.error("Error fetching student detail:", error)
      return
    }
  }

  async putStudentDetail(studentId: any, payload: StudentDetailForm): Promise<string | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.put(`/admin/student/${studentId}`, payload, {
        headers: { Authorization: `${BEARER} ${token}` }
      })
      return "Updated successfully"
    } catch (error) {
      console.error("Error updating student detail:", error)
      return
    }
  }

  async updateStudentAvatar(studentId: string | undefined, avatar: FormData): Promise<DefaultResponse | undefined> {
    try {
      const token = store.getState().auth.token
      const response = await api.put(`/admin/student/avatar/${studentId}`, avatar, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${BEARER} ${token}`
        }
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
