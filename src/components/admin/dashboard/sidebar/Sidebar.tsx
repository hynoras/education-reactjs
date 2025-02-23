import { UserOutlined, AppstoreOutlined, SettingOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import { useNavigate } from "react-router"
import "./style.scss"

type MenuItem = Required<MenuProps>["items"][number]

const items: MenuItem[] = [
  {
    key: "student",
    label: "Student",
    icon: <UserOutlined />
  },
  {
    type: "divider"
  },
  {
    key: "course",
    label: "Course",
    icon: <AppstoreOutlined />
  },
  {
    type: "divider"
  },
  {
    key: "setting",
    label: "Help",
    icon: <SettingOutlined />
  }
]

const Sidebar: React.FC = () => {
  const navigate = useNavigate()

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(`/admin/${e.key}`)
  }

  return <Menu onClick={onClick} defaultSelectedKeys={["student"]} mode="inline" items={items} />
}

export default Sidebar
