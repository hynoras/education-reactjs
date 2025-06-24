import "./ScheduleBuilder.scss"
import { DndContext, DragEndEvent, DragOverEvent, useDndContext } from "@dnd-kit/core"
import { message } from "antd"
import classNames from "classnames"
import ClassSidebar from "course/components/schedule/class_sidebar/ClassSideBar"
import ScheduleGrid from "course/components/schedule/schedule_grid/ScheduleGrid"
import { ClassSession } from "course/models/dtos/classSession"
import { dummyClasses } from "course/models/dtos/dummyClasses"
import { getRowSpan, handleCanDropCheck } from "course/utils/schedule/scheduleUtils"
import { useRef, useState } from "react"
import { DayOfWeek } from "shared/enums/dayOfWeek"

const ScheduleBuilderPage: React.FC = () => {
  const [placedClasses, setPlacedClasses] = useState<{ [key: string]: ClassSession }>({})
  const [messageApi, contextHolder] = message.useMessage()
  const cellRefs = useRef<Map<string, HTMLTableCellElement>>(new Map())
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties | null>(null)
  const [overlayClassname, setOverlayClassname] = useState<string>("")
  const { active, over } = useDndContext()
  const shouldShowOverlay = active && over

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
    if (!active || !over) return

    const draggedClass = dummyClasses.find((c) => c.courseClassId.toString() === active.id)
    if (!draggedClass) return

    const overKey = over.id as string
    const span = getRowSpan(draggedClass.startAt, draggedClass.endAt)

    const topCell = cellRefs.current.get(overKey)
    if (!topCell) return

    const rect = topCell.getBoundingClientRect()

    const classData = dummyClasses.find((c) => c.courseClassId.toString() === active.id)
    if (!classData) return
    const cellKey = over.id as string
    const [dropDay, dropTime] = cellKey.split("-")
    const canDrop = handleCanDropCheck(classData, dropDay as DayOfWeek, dropTime, placedClasses)
    setOverlayClassname(
      classNames("overlay-span", {
        "valid-drop": canDrop.status,
        "invalid-drop": !canDrop.status
      })
    )

    setOverlayStyle({
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height * span,
      zIndex: 999,
      pointerEvents: "none",
      border: "2px dashed #22c55e",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      borderRadius: "6px"
    })
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
    setOverlayStyle(null)
  }

  const pageStyle: React.CSSProperties = {
    display: "flex"
  }

  return (
    <DndContext onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      {contextHolder}
      <div style={pageStyle}>
        {overlayStyle && shouldShowOverlay && <div className={overlayClassname} style={overlayStyle} />}
        <ClassSidebar classList={dummyClasses} />
        <ScheduleGrid
          placedClasses={placedClasses}
          registerCellRef={(key, node) => {
            cellRefs.current.set(key, node as HTMLTableCellElement)
            if (node === null) {
              cellRefs.current.delete(key)
            }
          }}
        />
      </div>
    </DndContext>
  )
}

export default ScheduleBuilderPage
