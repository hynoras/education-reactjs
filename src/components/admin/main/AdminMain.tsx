import Sidebar from "../sidebar/Sidebar"
import Header from "../header/Header"
import { Outlet } from "react-router"
import "./style.scss"

const AdminMainPage = () => {
  return (
    <div className="dashboard-body">
      <Header />
      <div className="dashboard-container">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminMainPage
