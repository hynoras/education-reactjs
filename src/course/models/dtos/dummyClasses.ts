import { DayOfWeek } from "shared/enums/dayOfWeek"
import { ClassSession } from "./classSession"

export const dummyClasses: ClassSession[] = [
  {
    courseClassId: 1,
    courseId: "MATH101",
    courseName: "Calculus I",
    dayOfWeek: DayOfWeek.Monday,
    startAt: "07:30",
    endAt: "10:45",
    room: "A101",
    maxStudents: 30
  },
  {
    courseClassId: 2,
    courseId: "CS102",
    courseName: "Intro to CS",
    dayOfWeek: DayOfWeek.Tuesday,
    startAt: "13:00",
    endAt: "16:15",
    room: "Lab 2",
    maxStudents: 25
  }
]
