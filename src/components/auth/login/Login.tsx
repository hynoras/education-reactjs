import { Typography } from "@mui/material"
import { Input } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import "./style.scss"
import LoginButton from "themes/button/LoginButton"
import Title from "themes/text/Text"
import { Link, useNavigate } from "react-router"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "utils/store"
import { loginUser } from "contexts/loginReducer"
import { LoginRequest } from "models/auth/authModel"

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
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const role = useSelector((state: RootState) => state.auth.user?.role)

  const { Password } = Input

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = async (data: LoginRequest) => {
    const result = await dispatch(loginUser(data))
    if (loginUser.fulfilled.match(result)) {
      if (role === "ADMIN") navigate("/dashboard")
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
              render={({ field }) => <Input {...field} placeholder="Username" />}
            />
            {errors.username && (
              <Typography variant="subtitle1" className="error">
                {errors.username.message}
              </Typography>
            )}
            <i>
              <FontAwesomeIcon icon={faUser} />
            </i>
          </div>
          <div className={"input-container"}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => <Password {...field} placeholder="Password" />}
            />
            {errors.password && (
              <Typography variant="subtitle1" className="error">
                {errors.password.message}
              </Typography>
            )}
            <i>
              <FontAwesomeIcon icon={faLock} />
            </i>
          </div>
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
