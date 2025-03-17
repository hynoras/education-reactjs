import { Outlet } from "react-router"
import "./style.scss"
import Header from "components/shared/header/Header"
import Sidebar from "components/shared/sidebar/Sidebar"

const AdminMainPage = () => {
  return (
    <div className="admin-main-body">
      <Header />
      <div className="admin-main-container">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminMainPage
