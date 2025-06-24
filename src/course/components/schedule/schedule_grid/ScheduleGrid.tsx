import { ClassSession } from "course/models/dtos/classSession"
import DroppableCell from "../droppable_cell/DroppableCell"
import { DAYSLOTS, getRowSpan, TIMESLOTS } from "course/utils/schedule/scheduleUtils"
import { DayOfWeek } from "shared/enums/dayOfWeek"

type ScheduleGridProps = {
  placedClasses: {
    [key: string]: ClassSession
  }
  activeDragClass?: ClassSession | null
  dragOverCellKey?: string | null
  registerCellRef?: (key: string, node: HTMLTableCellElement | null) => void
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  placedClasses,
  activeDragClass,
  dragOverCellKey,
  registerCellRef
}) => {
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

  if (activeDragClass && dragOverCellKey) {
    const [dragDay, dragTime] = dragOverCellKey.split("-") as [DayOfWeek, string]
    const span = getRowSpan(activeDragClass.startAt, activeDragClass.endAt)
    const startIndex = TIMESLOTS.findIndex((t) => t.split("-")[0] === dragTime)

    for (let i = 1; i < span; i++) {
      const nextTime = TIMESLOTS[startIndex + i]
      if (!nextTime) continue
      coveredCells.add(`${dragDay}-${nextTime.split("-")[0]}`)
    }
  }

  return (
    <section className={"schedule-grid"} style={{ flex: 1, padding: "16px", overflowX: "auto" }}>
      <table className="schedule-grid-table">
        <thead>
          <tr>
            <th style={{ width: "120px" }}></th>
            {DAYSLOTS.map((day) => (
              <th key={day} className="schedule-grid-header-cell">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIMESLOTS.map((time) => (
            <tr key={time}>
              <td className="schedule-grid-time-cell">{time}</td>
              {DAYSLOTS.map((day) => {
                const cellKey = `${day}-${time.split("-")[0]}`

                if (coveredCells.has(cellKey)) return null

                const classData = placedClasses[cellKey]
                const rowSpan = classData ? getRowSpan(classData.startAt, classData.endAt) : 1
                return (
                  <DroppableCell
                    key={cellKey}
                    day={day}
                    time={time}
                    placedClass={classData ?? null}
                    rowSpan={rowSpan}
                    placedClasses={placedClasses}
                    registerCellRef={registerCellRef}
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
