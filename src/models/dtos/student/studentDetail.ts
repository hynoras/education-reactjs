import { Gender } from "enums/gender"

export interface ParentInfo {
  id: number
  full_name: string
  date_of_birth: string
  nationality: string
  permanent_address: string
  relationship: string
}

export interface PersonalInfo {
  identity: string
  full_name: string
  date_of_birth: Date
  gender: Gender
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
  full_name: string
  birth_date: Date
  gender?: Gender | undefined
  permanent_address: string
  temporary_address?: string | undefined
  ethnic_group?: string | undefined
  religion?: string | undefined
  citizen_id: string
}
