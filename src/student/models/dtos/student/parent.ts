import { Relationship } from "shared/enums/relationship"

export interface ParentInfo {
  id: number
  full_name: string
  birth_date: string
  nationality: string
  permanent_address: string
  relationship: Relationship
}

export interface ParentInfoForm {
  id: number
  student_id?: string | undefined
  full_name?: string
  birth_date?: Date
  nationality?: string
  permanent_address?: string
  relationship?: Relationship
}

export interface ParentID {
  id: number | undefined
}
