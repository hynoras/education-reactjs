import { Gender } from "shared/enums/gender"
import { BaseSelectProps } from "shared/models/dtos/dataDisplayandEntry"
import FilterSelect from "./FilterSelect"

const GenderSelect: React.FC<BaseSelectProps> = (props) => {
  const options = Object.values(Gender).map((g) => ({ label: g, value: g }))
  return <FilterSelect {...props} options={options} placeholder="Gender" />
}

export default GenderSelect
