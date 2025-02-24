import { AppBar, Toolbar, Typography } from "@mui/material"
import { Layout } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import { RootState } from "utils/store"
import Title from "themes/text/Text"
import "./style.scss"

const Header = () => {
  const username = useSelector((state: RootState) => state.auth.user?.username)
  const role = useSelector((state: RootState) => state.auth.user?.role)

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
              <Title className="username" variant="h6" sx={{ color: "black" }}>
                {username}
              </Title>
              <Typography className="role" variant="subtitle1" sx={{ color: "black" }}>
                {role}
              </Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Layout>
  )
}

export default Header
