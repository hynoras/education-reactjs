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

export function getRowSpan(startAt: string, endAt: string): number {
  const startIndex = TIMESLOTS.findIndex((slot) => slot.split("-")[0] === startAt)
  const endIndex = TIMESLOTS.findIndex((slot) => slot.split("-")[1] === endAt)

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) return 1
  return endIndex - startIndex + 1
}
