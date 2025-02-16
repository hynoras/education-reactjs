import { Typography } from "@mui/material"
import { Input } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import "./style.scss"
import LoginButton from "themes/button/LoginButton"
import Title from "themes/text/Text"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface LoginForm {
  username: string
  password: string
}

const loginSchema = yup.object({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must not exceed 20 characters")
    .required("Username must not empty"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password must not empty")
})

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema) // Integrating Yup with React Hook Form
  })

  // const onSubmit = async (data: LoginForm) => {
  //   const resultAction = await dispatch(loginUser(data));
  //   if (loginUser.fulfilled.match(resultAction)) {
  //     navigate("/dashboard");
  //   }
  // }

  return (
    <div className="login-container">
      <div className="form-box login">
        <form>
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
            <Input placeholder="Username" />
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
            <Input.Password type="password" placeholder="Password" />
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
  )
}

export default Login
