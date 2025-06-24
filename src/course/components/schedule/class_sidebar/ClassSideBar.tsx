import { useDraggable } from "@dnd-kit/core"
import classNames from "classnames"
import { ClassSession } from "course/models/dtos/classSession"

type ClassSideBarProps = {
  classList: ClassSession[]
}

const ClassCard: React.FC<{ classItem: ClassSession }> = ({ classItem }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: classItem.courseClassId.toString(),
    data: classItem
  })

  const transformStyle: React.CSSProperties = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined
  }

  return (
    <div
      className={classNames("class-card", { dragging: isDragging })}
      style={transformStyle}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <div>{classItem.courseName}</div>
      <div>{classItem.dayOfWeek}</div>
      <div>
        {classItem.startAt} - {classItem.endAt}
      </div>
    </div>
  )
}

const ClassSidebar: React.FC<ClassSideBarProps> = ({ classList }) => {
  return (
    <aside className={"class-sidebar"}>
      {classList.map((c) => (
        <ClassCard key={c.courseClassId} classItem={c} />
      ))}
    </aside>
  )
}

export default ClassSidebar
