import { DndContext, DragEndEvent } from "@dnd-kit/core"
import ClassSidebar from "course/components/schedule/ClassSideBar"
import ScheduleGrid from "course/components/schedule/ScheduleGrid"
import { ClassSession } from "course/models/dtos/classSession"
import { dummyClasses } from "course/models/dtos/dummyClasses"
import { useState } from "react"

const ScheduleBuilderPage = () => {
  const [placedClasses, setPlacedClasses] = useState<{ [key: string]: ClassSession }>({})

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const classData = dummyClasses.find((c) => c.courseClassId.toString() === active.id)
    if (!classData) return
    const cellKey = over.id as string
    setPlacedClasses((prev) => ({
      ...prev,
      [cellKey]: classData
    }))
  }

  const pageStyle: React.CSSProperties = {
    display: "flex"
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={pageStyle}>
        <ClassSidebar classList={dummyClasses} />
        <ScheduleGrid placedClasses={placedClasses} />
      </div>
    </DndContext>
  )
}

export default ScheduleBuilderPage
