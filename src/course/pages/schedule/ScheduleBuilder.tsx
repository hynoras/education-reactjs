import "./ScheduleBuilder.scss"
import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core"
import { message } from "antd"
import ClassSidebar from "course/components/schedule/class_sidebar/ClassSideBar"
import ScheduleGrid from "course/components/schedule/schedule_grid/ScheduleGrid"
import { ClassSession } from "course/models/dtos/classSession"
import { dummyClasses } from "course/models/dtos/dummyClasses"
import { handleCanDropCheck } from "course/utils/schedule/scheduleUtils"
import { useState } from "react"
import { DayOfWeek } from "shared/enums/dayOfWeek"

const ScheduleBuilderPage = () => {
  const [placedClasses, setPlacedClasses] = useState<{ [key: string]: ClassSession }>({})
  const [messageApi, contextHolder] = message.useMessage()

  const handleDisplayError = (errorType: number) => {
    switch (errorType) {
      case 1:
        return messageApi.open({
          type: "error",
          content: "Wrong day slot!"
        })
      case 2:
        return messageApi.open({
          type: "error",
          content: "Wrong time slot!"
        })
      case 3:
        return messageApi.open({
          type: "error",
          content: "Schedule is overlapped!"
        })
      default:
        break
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) {
      return
    }
    const classData = dummyClasses.find((c) => c.courseClassId.toString() === active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const classData = dummyClasses.find((c) => c.courseClassId.toString() === active.id)
    if (!classData) return
    const cellKey = over.id as string
    const [dropDay, dropTime] = cellKey.split("-")
    const canDrop = handleCanDropCheck(classData, dropDay as DayOfWeek, dropTime, placedClasses)
    if (!canDrop.status) {
      handleDisplayError(canDrop.errorType)
      return
    }
    if (canDrop.status) {
      setPlacedClasses((prev) => ({
        ...prev,
        [cellKey]: classData
      }))
    }
  }

  const pageStyle: React.CSSProperties = {
    display: "flex"
  }

  return (
    <DndContext onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      {contextHolder}
      <div style={pageStyle}>
        <ClassSidebar classList={dummyClasses} />
        <ScheduleGrid className={["schedule-grid"]} placedClasses={placedClasses} />
      </div>
    </DndContext>
  )
}

export default ScheduleBuilderPage
