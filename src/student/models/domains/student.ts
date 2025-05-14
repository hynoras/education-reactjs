import { Gender } from "shared/enums/gender"
import { ParentInfo } from "parent/models/dtos/parent"

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

  static fromDTO(dto: any): Student {
    const personal = dto.personal_information || {}
    const parentList = dto.parent_information || []

    return {
      identity: personal.identity,
      full_name: personal.full_name,
      birth_date: personal.birth_date,
      gender: personal.gender,
      permanent_address: personal.permanent_address,
      temporary_address: personal.temporary_address,
      ethnic_group: personal.ethnic_group,
      religion: personal.religion,
      citizen_id: personal.citizen_id,
      avatar: personal.avatar,
      parent_info: parentList.map((p: any) => ({
        parent_id: p.parent_id,
        full_name: p.full_name,
        birth_date: p.birth_date,
        nationality: p.nationality,
        permanent_address: p.permanent_address,
        relationship: p.relationship
      }))
    }
  }
}
