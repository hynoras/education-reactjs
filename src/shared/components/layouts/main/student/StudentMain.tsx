import { Outlet } from "react-router"
import "./StudentMain.scss"
import Header from "shared/components/layouts/header/Header"
import { Flex } from "antd"

const StudentMainPage = () => {
  return (
    <div className="admin-main-body">
      <Header />
      <Flex className="admin-main-container" vertical>
        <Outlet />
      </Flex>
    </div>
  )
}

export default StudentMainPage
