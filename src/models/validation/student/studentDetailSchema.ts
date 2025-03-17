import { Gender } from "enums/gender"
import * as yup from "yup"

export const studentDetailSchema = yup.object({
  full_name: yup.string().required("Student name must not empty"),
  date_of_birth: yup.string().required("Date of birth must not empty"),
  permanent_address: yup.string().required("Permanent address must not empty"),
  citizen_id: yup.string().required("Citizen ID must not empty")
})
