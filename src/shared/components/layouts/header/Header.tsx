import "./style.scss"
import { AppBar, Toolbar, Typography } from "@mui/material"
import { Layout } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { Title, Subtitle } from "shared/themes/text/Text"
import { useQueryClient } from "@tanstack/react-query"
import { UserResponse } from "auth/models/dtos/authModel"
import { AUTH } from "auth/constants/authConstants"

const Header = () => {
  const queryClient = useQueryClient()
  const account = queryClient.getQueryData<UserResponse | undefined>([AUTH.KEY.ACCOUNT_DETAIL])
  return (
    <Layout className="header-container">
      <AppBar className="header-appbar" position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar className="header-toolbar">
          <Typography variant="h4" sx={{ color: "black" }}>
            Welcome back!
          </Typography>
          <div className="user-container">
            <i className="header-user-icon">
              <FontAwesomeIcon icon={faUser} />
            </i>
            <div>
              <Title className="username" variant="h6" sx={{ color: "black", fontSize: "16px" }}>
                {account?.username}
              </Title>
              <Subtitle className="role" variant="subtitle1" sx={{ color: "black", fontSize: "16px" }}>
                {account?.role}
              </Subtitle>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Layout>
  )
}

export default Header
