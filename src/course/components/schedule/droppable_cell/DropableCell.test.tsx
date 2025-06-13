import { render, screen } from "@testing-library/react"
import DroppableCell from "./DroppableCell"
import { DayOfWeek } from "shared/enums/dayOfWeek"
import { useDroppable } from "@dnd-kit/core"
import { ClassSession } from "course/models/dtos/classSession"

jest.mock("@dnd-kit/core", () => ({
  useDroppable: jest.fn()
}))

const placedClasses: { [key: string]: ClassSession } = {
  "Monday-08:15": {
    courseClassId: 2,
    courseId: "CS102",
    courseName: "Intro to CS",
    dayOfWeek: DayOfWeek.Monday,
    startAt: "08:15",
    endAt: "10:00",
    room: "Lab 2",
    maxStudents: 25
  }
}

describe("DroppableCell", () => {
  beforeEach(() => {
    ;(useDroppable as jest.Mock).mockReturnValue({
      setNodeRef: jest.fn(),
      isOver: false
    })
  })

  it("renders an empty cell when placedClass is null", () => {
    render(
      <table>
        <tbody>
          <tr>
            <DroppableCell
              day={DayOfWeek.Monday}
              time="7:30"
              placedClass={null}
              rowSpan={1}
              placedClasses={placedClasses}
            />
          </tr>
        </tbody>
      </table>
    )
    expect(screen.queryByText(/Calculus I/)).not.toBeInTheDocument()
  })

  it("renders class content when placedClass is provided", () => {
    render(
      <table>
        <tbody>
          <tr>
            <DroppableCell
              day={DayOfWeek.Monday}
              time="7:30"
              rowSpan={2}
              placedClass={{
                courseClassId: 1,
                courseId: "MATH101",
                courseName: "Calculus I",
                dayOfWeek: DayOfWeek.Monday,
                startAt: "07:30",
                endAt: "10:45",
                room: "A101",
                maxStudents: 30
              }}
              placedClasses={placedClasses}
            />
          </tr>
        </tbody>
      </table>
    )
    expect(screen.getByText("Calculus I")).toBeInTheDocument()
    expect(screen.getByText("07:30 - 10:45")).toBeInTheDocument()
  })

  it("applies rowSpan properly", () => {
    render(
      <table>
        <tbody>
          <tr>
            <DroppableCell
              day={DayOfWeek.Monday}
              time="7:30"
              placedClass={null}
              rowSpan={3}
              placedClasses={placedClasses}
            />
          </tr>
        </tbody>
      </table>
    )
    const cell = screen.getByTestId("cell-Monday-7:30")
    expect(cell).toHaveAttribute("rowspan", "3")
  })

  it("applies red background when isOver is true", () => {
    ;(useDroppable as jest.Mock).mockReturnValue({
      setNodeRef: jest.fn(),
      isOver: true
    })

    render(
      <table>
        <tbody>
          <tr>
            <DroppableCell
              day={DayOfWeek.Monday}
              time="7:30"
              placedClass={null}
              rowSpan={1}
              placedClasses={placedClasses}
            />
          </tr>
        </tbody>
      </table>
    )

    const cell = screen.getByTestId("cell-Monday-7:30")
    expect(cell?.style.backgroundColor).toBe("rgb(254, 226, 226)") // "#fee2e2"
  })
})
