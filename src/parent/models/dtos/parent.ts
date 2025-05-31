import { Relationship } from "parent/enums/relationship"

export interface ParentInfo {
  parent_id: number
  full_name: string
  birth_date: string
  nationality: string
  permanent_address: string
  relationship: Relationship
}

export interface ParentInfoFormDto {
  parent_id: number
  student_id?: string | undefined
  full_name?: string
  birth_date?: Date
  nationality?: string
  permanent_address?: string
  relationship?: Relationship
}

export interface ParentID {
  parent_id: number | undefined
}
