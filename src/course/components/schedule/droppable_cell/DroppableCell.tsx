import { useDroppable } from "@dnd-kit/core"
import { ClassSession } from "course/models/dtos/classSession"
import { getRowSpan, handleCanDropCheck, TIMESLOTS } from "course/utils/schedule/scheduleUtils"
import { DayOfWeek } from "shared/enums/dayOfWeek"
import classNames from "classnames"
import { useCallback } from "react"

type DroppableCellProps = {
  day: DayOfWeek
  time: string
  placedClass: ClassSession | null
  rowSpan: number | undefined
  placedClasses: Record<string, ClassSession>
  registerCellRef?: (key: string, node: HTMLTableCellElement | null) => void
}

const DroppableCell: React.FC<DroppableCellProps> = ({
  day,
  time,
  placedClass,
  rowSpan,
  placedClasses,
  registerCellRef
}) => {
  const timeKey = time.split("-")[0]
  const cellKey = `${day}-${timeKey}`
  const { setNodeRef } = useDroppable({
    id: cellKey
  })

  const tdRef = useCallback(
    (node: HTMLTableCellElement | null) => {
      setNodeRef(node)
      registerCellRef?.(cellKey, node)
    },
    [registerCellRef, cellKey, setNodeRef]
  )

  return (
    <td ref={tdRef} className="droppable-cell" data-testid={`cell-${day}-${timeKey}`} rowSpan={rowSpan}>
      {placedClass && (
        <div className="class-box">
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
