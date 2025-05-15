import { TableProps, TableColumnsType, Table } from "antd"
import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Gender } from "shared/enums/gender"
import useFetch from "student/hooks/useFetch"
import { DepartmentNameList } from "department/models/dtos/department"
import { MajorNameList } from "major/models/dtos/major"
import { StudentList } from "student/models/dtos/studentList"
import departmentService from "department/services/departmentService"
import majorService from "major/services/majorService"
import ActionButtonList from "./ActionButtonList"
import { useQuery } from "@tanstack/react-query"
import { SORT_ORDER_ASC, SORT_ORDER_DESC } from "shared/constants/apiConstants"
import { MAJOR_NAME, MAJOR_NAME_PLURAL } from "major/constants/majorKeys"
import { ACTION_KEY, BIRTH_DATE_KEY, EMPTY_STRING, FULL_NAME_KEY, GENDER_KEY } from "shared/constants/genericValues"
import { DEPARTMENT_NAME } from "department/constants/departmentKeys"
import { IDENTITY } from "student/constants/studentKeys"
import { VIEW_STUDENT_DETAIL_ROUTE } from "student/constants/studentRoutes"

type StudentListTableProps = {
  students: StudentList[]
  loading: boolean
  setQueryOptions: React.Dispatch<React.SetStateAction<any>>
  rowSelection: TableProps<StudentList>["rowSelection"]
}

const StudentListTable: React.FC<StudentListTableProps> = ({ students, loading, setQueryOptions, rowSelection }) => {
  const navigate = useNavigate()

  const { data: departments } = useFetch<DepartmentNameList>(departmentService.getAllDepartmentName)
  const { data: majorNames } = useQuery<Array<MajorNameList>>({
    queryKey: [MAJOR_NAME_PLURAL],
    queryFn: () => majorService.getAllMajorName(),
    staleTime: Infinity
  })

  const onChangeTable: TableProps<StudentList>["onChange"] = (_, filters, sorter) => {
    const filtersList = Object.entries(filters).filter(([_, value]) => value && value.length > 0)
    handleFilter(filtersList)

    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter
    if (!singleSorter?.columnKey) return

    setQueryOptions((prev: any) => ({
      ...prev,
      sortBy: singleSorter.columnKey as string,
      sortOrder: singleSorter.order === "ascend" ? SORT_ORDER_ASC : SORT_ORDER_DESC
    }))
  }

  const updateFilter = (filtersList: Array<any>, key: string) => {
    const filter = filtersList.find(([filterKey]) => filterKey.includes(key))
    return filter ? filter[1]?.join(",") : EMPTY_STRING
  }

  const handleFilter = (filtersList: Array<any>) => {
    if (filtersList.length === 0) {
      setQueryOptions((prev: any) => ({
        ...prev,
        gender: EMPTY_STRING,
        major: EMPTY_STRING,
        department: EMPTY_STRING
      }))
      return
    }

    setQueryOptions((prev: any) => ({
      ...prev,
      gender: updateFilter(filtersList, GENDER_KEY),
      major: updateFilter(filtersList, MAJOR_NAME),
      department: updateFilter(filtersList, DEPARTMENT_NAME)
    }))
  }

  const onClick = useCallback(
    (record: StudentList) => {
      navigate(VIEW_STUDENT_DETAIL_ROUTE(record.identity))
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

  const majorFilter = majorNames?.map((value) => ({
    text: String(value.major_name),
    value: String(value.major_name)
  }))

  const columns: TableColumnsType<StudentList> = useMemo(
    () => [
      {
        title: "Student ID",
        dataIndex: IDENTITY,
        key: IDENTITY,
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
        dataIndex: FULL_NAME_KEY,
        key: FULL_NAME_KEY,
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
      { title: "Birth Date", dataIndex: BIRTH_DATE_KEY, key: BIRTH_DATE_KEY },
      { title: "Gender", dataIndex: GENDER_KEY, key: GENDER_KEY, filters: genderFilter },
      { title: "Major", dataIndex: MAJOR_NAME, key: MAJOR_NAME, filters: majorFilter },
      { title: "Department", dataIndex: DEPARTMENT_NAME, key: DEPARTMENT_NAME, filters: departmentFilter },
      {
        title: "Action",
        key: ACTION_KEY,
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
      rowKey={IDENTITY}
      onChange={onChangeTable}
    />
  )
}

export default StudentListTable
