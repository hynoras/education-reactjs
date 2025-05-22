import "./style.scss"
import { Typography } from "@mui/material"
import { Input } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import { LoginButton } from "shared/themes/button/LoginButton"
import Title from "shared/themes/text/Text"
import { Link, useNavigate } from "react-router"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { AppDispatch, store } from "shared/utils/store"
import { loadUser, loginUser } from "auth/contexts/loginReducer"
import { LoginRequest } from "auth/models/dtos/authModel"
import { loadIdentity } from "student/contexts/studentReducer"
import { GENERIC } from "shared/constants/genericValues"
import { STUDENT } from "student/constants/studentConstants"

const loginSchema = yup.object({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must not exceed 20 characters")
    .required("Username must not be empty"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password must not be empty")
})

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  })

  let status: "" | "error" | "warning" | undefined = ""
  if (errors.password) {
    status = "error"
  }

  const onSubmit = async (payload: LoginRequest) => {
    const result = await dispatch(loginUser(payload))
    const token = store.getState().auth.token
    await dispatch(loadUser(token as string))
    const role = store.getState().auth.user?.role
    if (loginUser.fulfilled.match(result)) {
      const username = store.getState().auth.user?.username
      if (role === GENERIC.KEY.ROLE.STUDENT) {
        await dispatch(loadIdentity(username as string))
        const identity = store.getState().student.identity
        navigate(STUDENT.ROUTE.NAVIGATION.VIEW_STUDENT_DETAIL(identity))
      }
      if (role === GENERIC.KEY.ROLE.ADMIN) navigate(STUDENT.ROUTE.NAVIGATION.VIEW_STUDENT_LIST)
    }
  }

  return (
    <body className="login-body">
      <div className="login-container">
        <div className="form-box login">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Title
              variant="h4"
              gutterBottom
              sx={{
                margin: "-15px 0 15px"
              }}
            >
              Login
            </Title>
            <div className={"input-container"}>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} status={status} placeholder="Username" />}
              />
              <i className="login-user-icon">
                <FontAwesomeIcon icon={faUser} />
              </i>
            </div>
            {errors.username && (
              <Typography variant="subtitle1" className="error">
                {errors.username.message}
              </Typography>
            )}
            <div className={"input-container"}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => <Input.Password {...field} className="password" placeholder="Password" />}
              />
              <i>
                <FontAwesomeIcon className="login-user-icon" icon={faLock} />
              </i>
            </div>
            {errors.password && (
              <Typography variant="subtitle1" className="error">
                {errors.password.message}
              </Typography>
            )}
            <Link to="/admin">Forgot password?</Link>
            <LoginButton type="submit" disableRipple>
              Login
            </LoginButton>
          </form>
        </div>
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <Title variant="h4">Hello, Welcome back!</Title>
            <Typography variant="subtitle1">Don't have an account?</Typography>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Login
