import { DayOfWeek } from "shared/enums/dayOfWeek"

export interface ClassSession {
  courseClassId: number
  courseId: string
  courseName: string
  dayOfWeek: DayOfWeek
  startAt: string
  endAt: string
  room: string
  maxStudents: number
}
