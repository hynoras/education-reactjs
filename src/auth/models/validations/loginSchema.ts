import * as yup from "yup"

export const loginSchema = yup.object({
  username: yup
    .string()
    .required("Username must not be empty")
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must not exceed 20 characters"),
  password: yup.string().required("Password must not be empty").min(6, "Password must be at least 6 characters")
})
