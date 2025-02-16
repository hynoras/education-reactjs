import { Typography } from "@mui/material"
import { Input } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import "./style.scss"
import LoginButton from "themes/button/LoginButton"
import Title from "themes/text/Text"
import { Link } from "react-router"

const Login: React.FC = () => {
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
            <i>
              <FontAwesomeIcon icon={faUser} />
            </i>
          </div>
          <div className={"input-container"}>
            <Input.Password type="password" placeholder="Password" />
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
