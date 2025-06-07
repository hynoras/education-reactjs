import { ClassSession } from "course/models/dtos/classSession"
import { DayOfWeek } from "shared/enums/dayOfWeek"
import DroppableCell from "./DroppableCell"

const days: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
  DayOfWeek.Sunday
]

const times = [
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

type ScheduleGridProps = {
  placedClasses: {
    [key: string]: ClassSession
  }
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ placedClasses }) => {
  const tableStyle: React.CSSProperties = {
    borderCollapse: "collapse",
    width: "100%"
  }

  const headerCellStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "4px"
  }

  const getRowSpan = (startAt: string, endAt: string): number => {
    const startIndex = times.findIndex((slot) => {
      const [start] = slot.split("-")
      return start === startAt
    })

    const endIndex = times.findIndex((slot) => {
      const [, end] = slot.split("-")
      return end === endAt
    })

    if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) return 1

    return endIndex - startIndex + 1
  }

  const coveredCells = new Set<string>()

  Object.entries(placedClasses).forEach(([cellKey, classData]) => {
    const [day, startTime] = cellKey.split("-")
    const rowSpan = getRowSpan(classData.startAt, classData.endAt)

    const startIndex = times.findIndex((t) => t.startsWith(startTime))
    for (let i = 1; i < rowSpan; i++) {
      const coveredTime = times[startIndex + i]
      if (coveredTime) {
        const key = `${day}-${coveredTime}`
        coveredCells.add(key)
      }
    }
  })

  return (
    <section style={{ flex: 1, padding: "16px", overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ width: "90px" }}></th>
            {days.map((day) => (
              <th key={day} style={headerCellStyle}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td style={headerCellStyle}>{time}</td>
              {days.map((day) => {
                const cellKey = `${day}-${time}`
                if (coveredCells.has(cellKey)) return null
                const classData = placedClasses[cellKey]
                if (classData) {
                  const rowSpan = getRowSpan(classData.startAt, classData.endAt)
                  return <DroppableCell key={cellKey} day={day} time={time} placedClass={classData} rowSpan={rowSpan} />
                }
                return <DroppableCell key={cellKey} day={day} time={time} placedClass={null} rowSpan={1} />
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default ScheduleGrid
