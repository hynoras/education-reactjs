import React from "react"
import { Button, Typography } from "@mui/material"
import { Input, Space } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import "./style.scss"

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="form-box login">
        <form>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <Space direction="vertical" style={{ width: "100%", alignItems: "center" }}>
            <div className="input-container">
              <Input placeholder="Username" />
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="input-container">
              <Input.Password placeholder="Password" />
              <FontAwesomeIcon icon={faLock} />
            </div>
            <Typography variant="body2" color="primary">
              <a href="#">Forgot password?</a>
            </Typography>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Space>
        </form>
      </div>
    </div>
  )
}

export default Login
