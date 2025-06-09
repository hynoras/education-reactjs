import "./ScheduleBuilder.scss"
import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core"
import { message } from "antd"
import ClassSidebar from "course/components/schedule/class_sidebar/ClassSideBar"
import ScheduleGrid from "course/components/schedule/schedule_grid/ScheduleGrid"
import { ClassSession } from "course/models/dtos/classSession"
import { dummyClasses } from "course/models/dtos/dummyClasses"
import { getRowSpan, TIMESLOTS } from "course/utils/schedule/scheduleUtils"
import { useState } from "react"
import { DayOfWeek } from "shared/enums/dayOfWeek"

type DnDScheduleError = {
  errorType: number
  status: boolean
}

const ScheduleBuilderPage = () => {
  const [placedClasses, setPlacedClasses] = useState<{ [key: string]: ClassSession }>({})
  const [messageApi, contextHolder] = message.useMessage()
  const [cellClass, setCellClass] = useState<string>("schedule-cell")
  // let errorClass = ""

  const handleCanDropCheck = (draggedClass: ClassSession, dropDay: DayOfWeek, dropTime: string): DnDScheduleError => {
    if (draggedClass.dayOfWeek !== dropDay) {
      return { errorType: 1, status: false }
    }

    if (draggedClass.startAt !== dropTime) {
      return { errorType: 2, status: false }
    }

    const draggedRowSpan = getRowSpan(draggedClass.startAt, draggedClass.endAt)
    const dropStartIndex = TIMESLOTS.findIndex((t) => t.split("-")[0] === dropTime)

    for (let i = 0; i < draggedRowSpan; i++) {
      const time = TIMESLOTS[dropStartIndex + i]
      if (!time) continue
      const key = `${dropDay}-${time.split("-")[0]}`
      if (placedClasses[key]) {
        return { errorType: 3, status: false }
      }
    }

    return { errorType: 0, status: true }
  }

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
      setCellClass("")
      return
    }

    const classData = dummyClasses.find((c) => c.courseClassId.toString() === active.id)
    if (!classData) return
    const cellKey = over.id as string
    const [dropDay, dropTime] = cellKey.split("-")
    const canDrop = handleCanDropCheck(classData, dropDay as DayOfWeek, dropTime)
    if (!canDrop.status) {
      setCellClass("error-cell")
    }
    if (canDrop.status) {
      setCellClass("correct-cell")
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const classData = dummyClasses.find((c) => c.courseClassId.toString() === active.id)
    if (!classData) return
    const cellKey = over.id as string
    const [dropDay, dropTime] = cellKey.split("-")
    const canDrop = handleCanDropCheck(classData, dropDay as DayOfWeek, dropTime)
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
        <ScheduleGrid className={["schedule-grid", `${cellClass}`]} placedClasses={placedClasses} />
      </div>
    </DndContext>
  )
}

export default ScheduleBuilderPage
