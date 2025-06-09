import { ClassSession } from "course/models/dtos/classSession"
import DroppableCell from "../droppable_cell/DroppableCell"
import { DAYSLOTS, getRowSpan, TIMESLOTS } from "course/utils/schedule/scheduleUtils"
import { WithClassName } from "shared/models/dtos/dataDisplayandEntry"

type ScheduleGridProps = WithClassName & {
  placedClasses: {
    [key: string]: ClassSession
  }
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ className = [], placedClasses }) => {
  const tableStyle: React.CSSProperties = {
    borderCollapse: "collapse",
    width: "100%"
  }

  const headerCellStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "4px"
  }

  const coveredCells = new Set<string>()

  Object.entries(placedClasses).forEach(([cellKey, classData]) => {
    const { dayOfWeek, startAt, endAt } = classData

    const rowSpan = getRowSpan(startAt, endAt)
    const startIndex = TIMESLOTS.findIndex((t) => t.split("-")[0] === startAt)

    for (let i = 1; i < rowSpan; i++) {
      const nextTime = TIMESLOTS[startIndex + i]
      if (!nextTime) continue
      const coveredKey = `${dayOfWeek}-${nextTime.split("-")[0]}`
      coveredCells.add(coveredKey)
    }
  })

  return (
    <section className={className[0] || ""} style={{ flex: 1, padding: "16px", overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ width: "90px" }}></th>
            {DAYSLOTS.map((day) => (
              <th key={day} style={headerCellStyle}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIMESLOTS.map((time) => (
            <tr key={time}>
              <td style={headerCellStyle}>{time}</td>
              {DAYSLOTS.map((day) => {
                const cellKey = `${day}-${time.split("-")[0]}`

                if (coveredCells.has(cellKey)) return null

                const classData = placedClasses[cellKey]
                if (classData) {
                  const rowSpan = getRowSpan(classData.startAt, classData.endAt)
                  return (
                    <DroppableCell
                      className={className[1] || ""}
                      key={cellKey}
                      day={day}
                      time={time}
                      placedClass={classData}
                      rowSpan={rowSpan}
                    />
                  )
                }

                return (
                  <DroppableCell
                    className={className[1] || ""}
                    key={cellKey}
                    day={day}
                    time={time}
                    placedClass={null}
                    rowSpan={1}
                  />
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default ScheduleGrid
