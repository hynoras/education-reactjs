import * as yup from "yup"

export const studentDetailSchema = yup.object({
  full_name: yup.string().required("Student name must not be empty"),
  birth_date: yup.date().required("Date of birth must not be empty"),
  permanent_address: yup.string().required("Permanent address must not be empty"),
  temporary_address: yup.string().notRequired(),
  ethnic_group: yup.string().notRequired(),
  religion: yup.string().notRequired(),
  citizen_id: yup.string().required("Citizen ID must not be empty")
})
