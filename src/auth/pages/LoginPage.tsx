import "./LoginPage.scss"
import { Button, Typography } from "antd"
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginRequest } from "auth/models/dtos/authModel"
import { loginSchema } from "auth/models/validations/loginSchema"
import useAuth from "auth/hooks/useAuth"
import { useSelector } from "react-redux"
import { RootState } from "shared/utils/store"
import { useEffect } from "react"
import LoginInput from "auth/components/LoginInput"

const LoginPage: React.FC = () => {
  const previousLocation = useSelector((state: RootState) => state.route.previousLocation)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && previousLocation !== "/") {
      navigate(previousLocation as string)
    }
  }, [isAuthenticated, previousLocation, navigate])

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema)
  })

  const { mutate, error: loginError, isPending } = useAuth.uselogin()

  const onSubmit = async (payload: LoginRequest) => {
    mutate(payload)
  }

  return (
    <body className="login-body">
      <div className="login-container">
        <div className="form-box login">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography.Title className="login-title">Login</Typography.Title>
            <LoginInput
              control={control}
              name="username"
              placeholder="Username"
              error={errors.username?.message}
              icon={faUser}
              disabled={isPending}
            />
            <LoginInput
              control={control}
              name="password"
              placeholder="Password"
              isPassword
              error={errors.password?.message}
              icon={faLock}
              disabled={isPending}
            />
            {loginError && (
              <Typography.Text type="danger" className="error-message">
                Username or password is incorrect
              </Typography.Text>
            )}

            <Link to="/admin">Forgot password?</Link>
            <Button className="login-btn" htmlType="submit" disabled={isPending}>
              Login
            </Button>
          </form>
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <Typography.Text className="login-text title">Hello, Welcome back!</Typography.Text>
            <Typography.Text className="login-text subtitle">Don't have an account?</Typography.Text>
          </div>
        </div>
      </div>
    </body>
  )
}

export default LoginPage
