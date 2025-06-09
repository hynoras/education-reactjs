import { useDroppable } from "@dnd-kit/core"
import { ClassSession } from "course/models/dtos/classSession"
import { DayOfWeek } from "shared/enums/dayOfWeek"

type DroppableCellProps = {
  className?: string
  day: DayOfWeek
  time: string
  placedClass: ClassSession | null
  rowSpan: number | undefined
}

const DroppableCell: React.FC<DroppableCellProps> = ({ className, day, time, placedClass, rowSpan }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `${day}-${time.split("-")[0]}`
  })

  // const cellStyle: React.CSSProperties = {
  //   border: "1px solid #ccc",
  //   height: "56px",
  //   textAlign: "center",
  //   verticalAlign: "top",
  //   backgroundColor: isOver ? "green" : "transparent",
  //   position: "relative"
  // }

  return (
    <td
      data-testid={`cell-${day}-${time.split("-")[0]}`}
      className={className || ""}
      rowSpan={rowSpan}
      ref={setNodeRef}
      // style={cellStyle}
    >
      {placedClass && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#dbeafe",
            borderRadius: "6px",
            padding: "4px",
            fontSize: "12px"
          }}
        >
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
