import { Gender } from "shared/enums/gender"
import { Relationship } from "shared/enums/relationship"

export interface ParentInfo {
  id: number
  full_name: string
  birth_date: string
  nationality: string
  permanent_address: string
  relationship: Relationship
}

export interface PersonalInfo {
  identity: string
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
  full_name: string
  birth_date: Date
  gender?: Gender | undefined
  permanent_address: string
  temporary_address?: string | undefined
  ethnic_group?: string | undefined
  religion?: string | undefined
  citizen_id: string
}

export interface ParentInfoForm {
  id: number
  full_name?: string
  birth_date?: Date
  nationality?: string
  permanent_address?: string
  relationship?: Relationship
}

export interface IdentityMap {
  identity: string
}
