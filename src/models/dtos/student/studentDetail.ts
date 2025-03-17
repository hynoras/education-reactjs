import { Gender } from "enums/gender"

export interface ParentInformation {
  full_name: string
  date_of_birth: string
  nationality: string
  permanent_address: string
  relationship: string
}

export interface PersonalInformation {
  identity: string
  full_name: string
  date_of_birth: string
  gender: Gender
  permanent_address: string
  temporary_address?: string
  ethnic_group: string
  religion: string
  citizen_id: string
  priority_group: string
}

export interface StudentDetail {
  personal_information: PersonalInformation
  parent_information: Array<ParentInformation>
}

export interface StudentForm {
  full_name: string
  date_of_birth: string
  gender?: string | undefined
  permanent_address: string
  temporary_address?: string | undefined
  ethnic_group?: string | undefined
  religion?: string | undefined
  citizen_id: string
  priority_group?: string | undefined
}
