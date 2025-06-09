// ScheduleBuilder.test.ts
import { ClassSession } from "course/models/dtos/classSession"
import { getRowSpan, TIMESLOTS } from "course/utils/schedule/scheduleUtils"
import { DayOfWeek } from "shared/enums/dayOfWeek"

const placedClasses: { [key: string]: ClassSession } = {
  "Monday-08:15": {
    courseClassId: 2,
    courseId: "CS102",
    courseName: "Intro to CS",
    dayOfWeek: DayOfWeek.Monday,
    startAt: "08:15",
    endAt: "10:00",
    room: "Lab 2",
    maxStudents: 25
  }
}

function handleCanDropCheck(
  draggedClass: ClassSession,
  dropDay: DayOfWeek,
  dropTime: string,
  placedMap = placedClasses
) {
  if (draggedClass.dayOfWeek !== dropDay) {
    return { errorType: 1, status: false }
  }

  if (draggedClass.startAt !== dropTime) {
    return { errorType: 2, status: false }
  }

  const draggedRowSpan = getRowSpan(draggedClass.startAt, draggedClass.endAt)
  const dropStartIndex = TIMESLOTS.findIndex((t) => t.split("-")[0] === dropTime)

  for (let i = 0; i < draggedRowSpan; i++) {
    const time = TIMESLOTS[dropStartIndex + i]
    if (!time) continue
    const key = `${dropDay}-${time.split("-")[0]}`
    if (placedMap[key]) {
      return { errorType: 3, status: false }
    }
  }

  return { errorType: 0, status: true }
}

describe("handleCanDropCheck - core logic", () => {
  const mockClass = {
    courseClassId: 1,
    courseId: "MATH101",
    courseName: "Calculus I",
    dayOfWeek: DayOfWeek.Monday,
    startAt: "07:30",
    endAt: "10:00",
    room: "A101",
    maxStudents: 30
  }

  it("returns false with errorType 1 when drop day is incorrect", () => {
    const result = handleCanDropCheck(mockClass, DayOfWeek.Tuesday, "07:30")
    expect(result).toEqual({ errorType: 1, status: false })
  })

  it("returns false with errorType 2 when drop time mismatches class start", () => {
    const result = handleCanDropCheck(mockClass, DayOfWeek.Monday, "08:15")
    expect(result).toEqual({ errorType: 2, status: false })
  })

  it("returns false with errorType 3 when dropped class overlaps an existing class", () => {
    const result = handleCanDropCheck(mockClass, DayOfWeek.Monday, "07:30")
    expect(result).toEqual({ errorType: 3, status: false })
  })
})
