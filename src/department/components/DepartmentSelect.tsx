import useDepartment from "department/hooks/useDepartment"
import { DepartmentNameList } from "department/models/dtos/department"
import FilterSelect from "shared/components/data_entry/dropdown/FilterSelect"
import { BaseSelectProps } from "shared/models/dtos/dataDisplayandEntry"

const DepartmentSelect: React.FC<BaseSelectProps> = (props) => {
  const { data } = useDepartment.useFetchDepartmentNames()
  const options =
    data?.map((value: DepartmentNameList) => ({
      label: String(value.department_name),
      value: props.isForm ? value.department_id : value.department_name
    })) || []

  return <FilterSelect {...props} options={options} placeholder="Department" />
}

export default DepartmentSelect
