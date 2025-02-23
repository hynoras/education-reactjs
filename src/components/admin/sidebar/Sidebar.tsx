import React from "react"
import { UserOutlined, AppstoreOutlined, SettingOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import "./style.scss"

type MenuItem = Required<MenuProps>["items"][number]

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "Student",
    icon: <UserOutlined />
  },
  {
    type: "divider"
  },
  {
    key: "sub2",
    label: "Course",
    icon: <AppstoreOutlined />
  },
  {
    type: "divider"
  },
  {
    key: "sub3",
    label: "Help",
    icon: <SettingOutlined />
  }
]

const Sidebar: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e)
  }

  return <Menu onClick={onClick} defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" items={items} />
}

export default Sidebar
