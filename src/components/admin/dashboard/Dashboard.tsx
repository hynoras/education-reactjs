import Sidebar from "./sidebar/Sidebar"
import { Outlet } from "react-router"
import "./style.scss"

const Dashboard = () => {
  return (
    <div className="dashboard-body">
      <div className="dashboard-container">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
