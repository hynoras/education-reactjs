import { useDroppable } from "@dnd-kit/core"
import { ClassSession } from "course/models/dtos/classSession"
import { getRowSpan, handleCanDropCheck } from "course/utils/schedule/scheduleUtils"
import { DayOfWeek } from "shared/enums/dayOfWeek"
import classNames from "classnames"

type DroppableCellProps = {
  day: DayOfWeek
  time: string
  placedClass: ClassSession | null
  rowSpan: number | undefined
  placedClasses: Record<string, ClassSession>
}

const DroppableCell: React.FC<DroppableCellProps> = ({ day, time, placedClass, rowSpan, placedClasses }) => {
  const timeKey = time.split("-")[0]
  const cellKey = `${day}-${timeKey}`
  const { active, setNodeRef, isOver } = useDroppable({
    id: cellKey
  })

  const dropCheck =
    isOver && active?.data.current
      ? handleCanDropCheck(active.data.current as ClassSession, day, time.split("-")[0], placedClasses)
      : null

  if (isOver && active?.data.current) {
    rowSpan = getRowSpan(active.data.current.startAt, active.data.current.endAt)
  }
  const cellClass = classNames("droppable-cell", {
    "correct-cell": dropCheck?.status,
    "error-cell": dropCheck && !dropCheck.status
  })

  return (
    <td data-testid={`cell-${day}-${timeKey}`} className={cellClass} rowSpan={rowSpan} ref={setNodeRef}>
      {placedClass && (
        <div>
          <div>{placedClass.courseName}</div>
          <div>
            {placedClass.startAt} - {placedClass.endAt}
          </div>
        </div>
      )}
    </td>
  )
}

export default DroppableCell
