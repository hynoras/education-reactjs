import { Gender } from "enums/gender"
import { ParentInformation, StudentDetail } from "models/dtos/student/studentDetail"

export class Student {
  constructor(
    public identity: string,
    public full_name: string,
    public date_of_birth: Date,
    public gender: Gender,
    public permanent_address: string,
    public temporary_address: string | undefined,
    public ethnic_group: string,
    public religion: string,
    public citizen_id: string,
    public parent_information: Array<ParentInformation>
  ) {}

  static fromDTO(dto: StudentDetail): Student {
    return new Student(
      dto.personal_information.identity,
      dto.personal_information.full_name,
      dto.personal_information.date_of_birth,
      dto.personal_information.gender,
      dto.personal_information.permanent_address,
      dto.personal_information.temporary_address,
      dto.personal_information.ethnic_group,
      dto.personal_information.religion,
      dto.personal_information.citizen_id,
      dto.parent_information
    )
  }
}
