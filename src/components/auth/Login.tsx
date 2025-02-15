import { Typography } from "@mui/material"
import { Input } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import "./style.scss"
import LoginButton from "themes/button/LoginButton"

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="form-box login">
        <form>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              margin: "-15px 0 15px"
            }}
          >
            Login
          </Typography>
          <div className={"input-container"}>
            <Input placeholder="Username" required />
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
          <Typography variant="body2">
            <a href="#">Forgot password?</a>
          </Typography>
          <LoginButton type="submit">Login</LoginButton>
        </form>
      </div>
    </div>
  )
}

export default Login
