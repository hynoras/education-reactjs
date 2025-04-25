import { TableProps, TableColumnsType, Table } from "antd"
import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Gender } from "shared/enums/gender"
import useFetch from "student/hook/useFetch"
import { DepartmentNameList } from "student/models/dtos/student/department"
import { MajorNameList } from "student/models/dtos/student/major"
import { StudentList } from "student/models/dtos/student/studentList"
import departmentService from "student/services/student/departmentService"
import majorService from "student/services/student/majorService"
import ActionButtonList from "./ActionButtonList"

type StudentListTableProps = {
  students: StudentList[]
  loading: boolean
  setQueryOptions: React.Dispatch<React.SetStateAction<any>>
}

const StudentListTable: React.FC<StudentListTableProps> = ({ students, loading, setQueryOptions }) => {
  const navigate = useNavigate()

  const { data: departments } = useFetch<DepartmentNameList>(departmentService.getAllDepartmentName)
  const { data: majors } = useFetch<MajorNameList>(majorService.getAllMajorName)

  const onChangeTable: TableProps<StudentList>["onChange"] = (_, filters, sorter) => {
    const filtersList = Object.entries(filters).filter(([_, value]) => value && value.length > 0)
    handleFilter(filtersList)

    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter
    if (!singleSorter?.columnKey) return

    setQueryOptions((prev: any) => ({
      ...prev,
      sortBy: singleSorter.columnKey as string,
      sortOrder: singleSorter.order === "ascend" ? "asc" : "desc"
    }))
  }

  const updateFilter = (filtersList: Array<any>, key: string) => {
    const filter = filtersList.find(([filterKey]) => filterKey.includes(key))
    return filter ? filter[1]?.join(",") : ""
  }

  const handleFilter = (filtersList: Array<any>) => {
    if (filtersList.length === 0) {
      setQueryOptions((prev: any) => ({
        ...prev,
        gender: "",
        major: "",
        department: ""
      }))
      return
    }

    setQueryOptions((prev: any) => ({
      ...prev,
      gender: updateFilter(filtersList, "gender"),
      major: updateFilter(filtersList, "major_name"),
      department: updateFilter(filtersList, "department_name")
    }))
  }

  const onClick = useCallback(
    (record: StudentList) => {
      navigate(`/admin/student/${record.identity}/view`)
    },
    [navigate]
  )

  const genderFilter = Object.values(Gender).map((value) => ({
    text: value,
    value: value
  }))

  const departmentFilter = departments.map((value) => ({
    text: String(value.department_name),
    value: String(value.department_name)
  }))

  const majorFilter = majors.map((value) => ({
    text: String(value.major_name),
    value: String(value.major_name)
  }))

  const columns: TableColumnsType<StudentList> = useMemo(
    () => [
      {
        title: "Student ID",
        dataIndex: "identity",
        key: "identity",
        onCell: (record: StudentList) => ({
          onClick: () => onClick(record),
          style: {
            cursor: "pointer",
            color: "#7494ec",
            textDecoration: "underline"
          }
        }),
        sorter: true
      },
      {
        title: "Full Name",
        dataIndex: "full_name",
        key: "fullName",
        onCell: (record: StudentList) => ({
          onClick: () => onClick(record),
          style: {
            cursor: "pointer",
            color: "#7494ec",
            textDecoration: "underline"
          }
        }),
        sorter: true
      },
      { title: "Date of Birth", dataIndex: "birth_date", key: "birth_date" },
      { title: "Gender", dataIndex: "gender", key: "gender", filters: genderFilter },
      { title: "Major", dataIndex: "major_name", key: "major_name", filters: majorFilter },
      { title: "Department", dataIndex: "department_name", key: "department_name", filters: departmentFilter },
      {
        title: "Action",
        key: "action",
        render: (_text: any, record: StudentList) => <ActionButtonList identity={record?.identity.toString()} />,
        align: "center"
      }
    ],
    [departmentFilter, genderFilter, majorFilter, onClick]
  )

  return (
    <Table<StudentList>
      columns={columns}
      dataSource={students}
      pagination={false}
      loading={loading}
      rowKey="identity"
      onChange={onChangeTable}
    />
  )
}

export default StudentListTable
