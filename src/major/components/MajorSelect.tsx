import { MajorNameList } from "major/models/dtos/major"
import useMajor from "major/hooks/useMajor"
import FilterSelect from "shared/components/data_entry/dropdown/FilterSelect"
import { BaseSelectProps } from "shared/models/dtos/dataDisplayandEntry"

const MajorSelect: React.FC<BaseSelectProps> = (props) => {
  const { data } = useMajor.useFetchMajorNames()
  const options =
    data?.map((value: MajorNameList) => ({
      label: String(value.major_name),
      value: props.isForm ? value.major_id : value.major_name
    })) || []

  return <FilterSelect {...props} options={options} placeholder="Major" />
}

export default MajorSelect
