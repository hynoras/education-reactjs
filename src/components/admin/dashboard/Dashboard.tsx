import Sidebar from "../sidebar/Sidebar"
import "./style.scss"

const Dashboard = () => {
  return (
    <body className="dashboard-body">
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <p>Admin Dashboard</p>
        </div>
      </div>
    </body>
  )
}

export default Dashboard
