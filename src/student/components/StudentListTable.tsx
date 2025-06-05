import { TableProps, TableColumnsType, Table } from "antd"
import { useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { StudentList } from "student/models/dtos/studentList"
import ActionButtonList from "../../shared/components/general/button/ActionButtonList"
import { MAJOR } from "major/constants/majorConstants"
import { API } from "shared/constants/apiConstants"
import { GENERIC } from "shared/constants/genericValues"
import { DEPARTMENT } from "department/constants/departmentConstants"
import { STUDENT } from "student/constants/studentConstants"
import useStudent from "student/hooks/useStudent"
import { MessageInstance } from "antd/es/message/interface"
import Popup from "shared/components/feedback/modal/Popup"

type StudentListTableProps = {
  students: StudentList[]
  loading: boolean
  setQueryOptions: React.Dispatch<React.SetStateAction<any>>
  rowSelection: TableProps<StudentList>["rowSelection"]
  messageApi: MessageInstance
}

const StudentListTable: React.FC<StudentListTableProps> = ({
  students,
  loading,
  setQueryOptions,
  rowSelection,
  messageApi
}) => {
  const navigate = useNavigate()
  const [selectedStudentId, setSelectedStudentId] = useState<string>()
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false)
  const { mutate } = useStudent.useDeleteStudentPersonalInfoMutation(messageApi)
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
      navigate(STUDENT.ROUTE.NAVIGATION.VIEW_STUDENT_DETAIL(record.student_id))
    },
    [navigate]
  )

  const handleConfirmDelete = () => {
    if (!selectedStudentId) return
    mutate(selectedStudentId)
    setIsDeleteConfirmVisible(false)
  }

  const columns: TableColumnsType<StudentList> = useMemo(
    () => [
      {
        title: "Student ID",
        dataIndex: STUDENT.KEY.GENERIC.STUDENT_ID,
        key: STUDENT.KEY.ANTD.STUDENT_ID,
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
      { title: "Gender", dataIndex: GENERIC.KEY.GENDER, key: GENERIC.KEY.GENDER },
      { title: "Major", dataIndex: MAJOR.KEY.MAJOR_NAME, key: MAJOR.KEY.MAJOR_NAME },
      {
        title: "Department",
        dataIndex: DEPARTMENT.KEY.DEPARTMENT_NAME,
        key: DEPARTMENT.KEY.DEPARTMENT_NAME
      },
      {
        title: "Action",
        key: GENERIC.KEY.ACTION,
        render: (_text: any, record: StudentList) => {
          return (
            <ActionButtonList
              studentId={record.student_id}
              setIsOpenDeleteConfirm={(id) => {
                setSelectedStudentId(id as string)
                setIsDeleteConfirmVisible(true)
              }}
              pageURL={STUDENT.ROUTE.NAVIGATION.EDIT_STUDENT_PERSONAL_INFO(record.student_id)}
            />
          )
        },
        align: "center"
      }
    ],
    [onClick]
  )

  return (
    <>
      <Table<StudentList>
        columns={columns}
        dataSource={students}
        pagination={false}
        rowSelection={{ type: "checkbox", ...rowSelection }}
        loading={loading}
        rowKey={STUDENT.KEY.GENERIC.STUDENT_ID}
        onChange={onChangeTable}
      />
      <Popup
        isOpen={isDeleteConfirmVisible}
        setIsOpen={(open) => setIsDeleteConfirmVisible(open)}
        onOk={handleConfirmDelete}
        content={`Confirm deleting student ${selectedStudentId}?`}
      />
    </>
  )
}

export default StudentListTable
