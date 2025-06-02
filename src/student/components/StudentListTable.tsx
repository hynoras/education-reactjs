import { TableProps, TableColumnsType, Table } from "antd"
import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Gender } from "shared/enums/gender"
import { DepartmentNameList } from "department/models/dtos/department"
import { MajorNameList } from "major/models/dtos/major"
import { StudentList } from "student/models/dtos/studentList"
import ActionButtonList from "./ActionButtonList"
import { MAJOR } from "major/constants/majorConstants"
import { API } from "shared/constants/apiConstants"
import { GENERIC } from "shared/constants/genericValues"
import { DEPARTMENT } from "department/constants/departmentConstants"
import { STUDENT } from "student/constants/studentConstants"
import useMajor from "major/hooks/useMajor"
import useDepartment from "department/hooks/useDepartment"

type StudentListTableProps = {
  students: StudentList[]
  loading: boolean
  setQueryOptions: React.Dispatch<React.SetStateAction<any>>
  rowSelection: TableProps<StudentList>["rowSelection"]
}

const StudentListTable: React.FC<StudentListTableProps> = ({ students, loading, setQueryOptions, rowSelection }) => {
  const navigate = useNavigate()

  const { data: departmentNames } = useDepartment.useFetchDepartmentNames()
  const { data: majorNames } = useMajor.useFetchMajorNames()
  const onChangeTable: TableProps<StudentList>["onChange"] = (_, filters, sorter) => {
    const filtersList = Object.entries(filters).filter(([_, value]) => value && value.length > 0)
    handleFilter(filtersList)

    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter
    if (!singleSorter?.columnKey) return

    setQueryOptions((prev: any) => ({
      ...prev,
      sortBy: singleSorter.columnKey as string,
      sortOrder: singleSorter.order === "ascend" ? API.PARAMS.SORT.ORDER_ASC : API.PARAMS.SORT.ORDER_DESC
    }))
  }

  const updateFilter = (filtersList: Array<any>, key: string) => {
    const filter = filtersList.find(([filterKey]) => filterKey.includes(key))
    return filter ? filter[1]?.join(",") : GENERIC.EMPTY_VALUE.STRING
  }

  const handleFilter = (filtersList: Array<any>) => {
    if (filtersList.length === 0) {
      setQueryOptions((prev: any) => ({
        ...prev,
        gender: GENERIC.EMPTY_VALUE.STRING,
        major: GENERIC.EMPTY_VALUE.STRING,
        department: GENERIC.EMPTY_VALUE.STRING
      }))
      return
    }

    setQueryOptions((prev: any) => ({
      ...prev,
      gender: updateFilter(filtersList, GENERIC.KEY.GENDER),
      major: updateFilter(filtersList, MAJOR.KEY.MAJOR_NAME),
      department: updateFilter(filtersList, DEPARTMENT.KEY.DEPARTMENT_NAME)
    }))
  }

  const onClick = useCallback(
    (record: StudentList) => {
      navigate(STUDENT.ROUTE.NAVIGATION.VIEW_STUDENT_DETAIL(record.identity))
    },
    [navigate]
  )

  const genderFilter = Object.values(Gender).map((value) => ({
    text: value,
    value: value
  }))

  const departmentFilter = departmentNames?.map((value: DepartmentNameList) => ({
    text: String(value.department_name),
    value: String(value.department_name)
  }))

  const majorFilter = majorNames?.map((value: MajorNameList) => ({
    text: String(value.major_name),
    value: String(value.major_name)
  }))

  const columns: TableColumnsType<StudentList> = useMemo(
    () => [
      {
        title: "Student ID",
        dataIndex: STUDENT.KEY.IDENTITY,
        key: STUDENT.KEY.IDENTITY,
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
        dataIndex: GENERIC.KEY.FULL_NAME,
        key: GENERIC.KEY.ANTD_TABLE.FULL_NAME,
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
      { title: "Birth Date", dataIndex: GENERIC.KEY.BIRTH_DATE, key: GENERIC.KEY.BIRTH_DATE },
      { title: "Gender", dataIndex: GENERIC.KEY.GENDER, key: GENERIC.KEY.GENDER, filters: genderFilter },
      { title: "Major", dataIndex: MAJOR.KEY.MAJOR_NAME, key: MAJOR.KEY.MAJOR_NAME, filters: majorFilter },
      {
        title: "Department",
        dataIndex: DEPARTMENT.KEY.DEPARTMENT_NAME,
        key: DEPARTMENT.KEY.DEPARTMENT_NAME,
        filters: departmentFilter
      },
      {
        title: "Action",
        key: GENERIC.KEY.ACTION,
        render: (_text: any, record: StudentList) => <ActionButtonList identity={record?.identity} />,
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
      rowSelection={{ type: "checkbox", ...rowSelection }}
      loading={loading}
      rowKey={STUDENT.KEY.IDENTITY}
      onChange={onChangeTable}
    />
  )
}

export default StudentListTable
