export interface StudentList {
  identity: number
  full_name: string
  birth_date: string
  gender: string
  major_name: string
  department_name: string
}

export interface PaginatedStudentList {
  content: StudentList[]
  total_element: number
  total_page: number
  last: boolean
}

export interface ParentInformation {
  full_name: string
  birth_date: string
  nationality: string
  permanent_address: string
  relationship: string
}

export interface PersonalInformation {
  identity: string
  full_name: string
  birth_date: string
  gender: string
  permanent_address: string
  temporary_address: string
  ethnic_group: string
  religion: string
  citizen_id: string
  priority_group: string
}

export interface StudentDetail {
  personal_information: PersonalInformation
  parent_information: ParentInformation[]
}
