import { ClassSession } from "course/models/dtos/classSession"
import { DnDScheduleError } from "course/models/dtos/dndSchedule"
import { DayOfWeek } from "shared/enums/dayOfWeek"

export const DAYSLOTS: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
  DayOfWeek.Sunday
]

export const TIMESLOTS: string[] = [
  "07:30-08:15",
  "08:15-09:00",
  "09:00-10:00",
  "10:00-10:45",
  "10:45-11:30",
  "13:00-13:45",
  "13:45-14:30",
  "14:30-15:30",
  "15:30-16:15",
  "16:15-17:00"
]

export const getRowSpan = (startAt: string, endAt: string): number => {
  const startIndex = TIMESLOTS.findIndex((slot) => slot.split("-")[0] === startAt)
  const endIndex = TIMESLOTS.findIndex((slot) => slot.split("-")[1] === endAt)

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) return 1
  return endIndex - startIndex + 1
}

export const handleCanDropCheck = (
  draggedClass: ClassSession,
  dropDay: DayOfWeek,
  dropTime: string,
  placedClasses: {
    [key: string]: ClassSession
  }
): DnDScheduleError => {
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
    if (placedClasses[key]) {
      return { errorType: 3, status: false }
    }
  }

  return { errorType: 0, status: true }
}

export const getSpannedCellKeys = (draggedClass: ClassSession, dropDay: DayOfWeek, dropTime: string): string[] => {
  const span = getRowSpan(draggedClass.startAt, draggedClass.endAt)
  const startIndex = TIMESLOTS.findIndex((slot) => slot.split("-")[0] === dropTime)

  const keys: string[] = []

  for (let i = 0; i < span; i++) {
    const time = TIMESLOTS[startIndex + i]
    if (!time) continue

    const key = `${dropDay}-${time.split("-")[0]}`
    keys.push(key)
  }

  return keys
}
