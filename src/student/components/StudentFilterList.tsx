import { Space } from "antd"
import DepartmentSelect from "department/components/DepartmentSelect"
import MajorSelect from "major/components/MajorSelect"
import GenderSelect from "shared/components/data_entry/dropdown/GenderSelect"
import { WithClassName } from "shared/models/dtos/dataDisplayandEntry"
import { StudentListQueryOptions } from "student/models/dtos/studentList"

type StudentFilterListProps = {
  majorFilter: Array<string> | undefined
  setMajorFilter: React.Dispatch<React.SetStateAction<string[] | undefined>>
  departmentFilter: Array<string> | undefined
  setDepartmentFilter: React.Dispatch<React.SetStateAction<string[] | undefined>>
  genderFilter: Array<string> | undefined
  setGenderFilter: React.Dispatch<React.SetStateAction<string[] | undefined>>
  setQueryOptions: React.Dispatch<React.SetStateAction<StudentListQueryOptions>>
}

const StudentFilterList: React.FC<StudentFilterListProps & WithClassName> = ({
  className = [],
  majorFilter,
  setMajorFilter,
  departmentFilter,
  setDepartmentFilter,
  genderFilter,
  setGenderFilter,
  setQueryOptions
}) => {
  return (
    <Space className={className[0]}>
      <GenderSelect
        className={["", "student-filter-select"]}
        isForm={false}
        showLabel={false}
        value={genderFilter}
        onChange={(value) => {
          setGenderFilter(value)
          setQueryOptions((prev) => ({
            ...prev,
            gender: value.join(",")
          }))
        }}
        name={""}
      />
      <MajorSelect
        className={["", "student-filter-select"]}
        isForm={false}
        showLabel={false}
        value={majorFilter}
        onChange={(value) => {
          setMajorFilter(value)
          setQueryOptions((prev) => ({
            ...prev,
            major: value.join(",")
          }))
        }}
        name={""}
      />
      <DepartmentSelect
        className={["", "department-filter student-filter-select"]}
        isForm={false}
        showLabel={false}
        value={departmentFilter}
        onChange={(value) => {
          setDepartmentFilter(value)
          setQueryOptions((prev) => ({
            ...prev,
            department: value.join(",")
          }))
        }}
        name={""}
      />
    </Space>
  )
}

export default StudentFilterList
