import Sidebar from "../sidebar/Sidebar"
import Header from "../header/Header"
import { Outlet } from "react-router"
import "./style.scss"

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
