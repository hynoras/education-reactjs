// ScheduleGrid.test.tsx
import { render, screen } from "@testing-library/react"
import ScheduleGrid from "./ScheduleGrid"
import { DayOfWeek } from "shared/enums/dayOfWeek"

const mockClass = {
  courseClassId: 1,
  courseId: "MATH101",
  courseName: "Calculus I",
  dayOfWeek: DayOfWeek.Monday,
  startAt: "07:30",
  endAt: "10:45",
  room: "A101",
  maxStudents: 30
}

describe("ScheduleGrid", () => {
  it("getRowSpan returns 4 when startAt is 07:30 and endAt is 10:45", () => {
    render(<ScheduleGrid placedClasses={{ "Monday-07:30": mockClass }} />)

    const cell = screen.getByTestId("cell-Monday-07:30")
    expect(cell).toBeInTheDocument()
    expect(cell).toHaveAttribute("rowspan", "4")
  })

  it("does not render cells that are covered by a rowspan", () => {
    render(<ScheduleGrid placedClasses={{ "Monday-07:30": mockClass }} />)

    expect(screen.getByTestId("cell-Monday-07:30")).toBeInTheDocument()
    expect(screen.queryByTestId("cell-Monday-08:15")).toBeNull()
    expect(screen.queryByTestId("cell-Monday-09:00")).toBeNull()
    expect(screen.queryByTestId("cell-Monday-10:00")).toBeNull()
  })
})
