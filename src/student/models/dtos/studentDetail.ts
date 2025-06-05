import { ParentInfo } from "parent/models/dtos/parent"
import { Gender } from "shared/enums/gender"

export interface PersonalInfo {
  student_id: string
  full_name: string
  birth_date: Date
  gender: Gender | undefined
  permanent_address: string
  temporary_address?: string
  ethnic_group: string
  religion: string
  citizen_id: string
  avatar: string
}

export interface StudentDetail {
  personal_info: PersonalInfo
  parent_info: Array<ParentInfo>
}

export interface StudentDetailForm {
  student_id?: string
  full_name: string
  birth_date: Date
  gender?: Gender | undefined
  permanent_address: string
  temporary_address?: any
  ethnic_group?: any
  religion?: any
  citizen_id: string
  major?: number
}

export interface StudentIdMap {
  student_id: string
}
