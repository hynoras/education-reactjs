import { useDraggable } from "@dnd-kit/core"
import { ClassSession } from "course/models/dtos/classSession"

type ClassSideBarProps = {
  classList: ClassSession[]
}

const ClassCard: React.FC<{ classItem: ClassSession }> = ({ classItem }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: classItem.courseClassId.toString()
  })

  const style: React.CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "10px",
    backgroundColor: "#fff",
    cursor: "grab",
    opacity: isDragging ? 0.5 : 1,
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined
  }

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <div>
        <strong>{classItem.courseName}</strong>
      </div>
      <div>{classItem.dayOfWeek}</div>
      <div>
        {classItem.startAt} - {classItem.endAt}
      </div>
    </div>
  )
}

const ClassSidebar: React.FC<ClassSideBarProps> = ({ classList }) => {
  return (
    <aside style={{ width: "250px", height: "90vh", padding: "16px", backgroundColor: "#fef3c7", overflowY: "auto" }}>
      {classList.map((c) => (
        <ClassCard key={c.courseClassId} classItem={c} />
      ))}
    </aside>
  )
}

export default ClassSidebar
