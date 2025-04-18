import { Gender } from "enums/gender"
import { ParentInfo, StudentDetail } from "models/dtos/student/studentDetail"

export class Student {
  constructor(
    public identity: string,
    public full_name: string,
    public birth_date: Date,
    public gender: Gender,
    public permanent_address: string,
    public temporary_address: string | undefined,
    public ethnic_group: string,
    public religion: string,
    public citizen_id: string,
    public avatar: string,
    public parent_info: Array<ParentInfo>
  ) {}

  static fromDTO(dto: StudentDetail): Student {
    return new Student(
      dto.personal_info.identity,
      dto.personal_info.full_name,
      dto.personal_info.birth_date,
      dto.personal_info.gender,
      dto.personal_info.permanent_address,
      dto.personal_info.temporary_address,
      dto.personal_info.ethnic_group,
      dto.personal_info.religion,
      dto.personal_info.citizen_id,
      dto.personal_info.avatar,
      dto.parent_info
    )
  }
}
