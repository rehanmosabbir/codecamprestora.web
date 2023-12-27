import React, { useState } from "react";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineRestaurantMenu, MdOutlineReviews } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { SlPicture } from "react-icons/sl";
import { LuClipboardList } from "react-icons/lu";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Branch Details", "sub1", <TbListDetails size="1.1rem" />),
  getItem("Branch Users", "sub2", <FaUsers size="1.1rem" />),
  getItem("Menu", "sub4", <MdOutlineRestaurantMenu size="1.1rem" />, [
    getItem("Category", "9"),
    getItem("List of food items", "10"),
  ]),
  getItem("Orders List", "11", <LuClipboardList size="1.1rem" />),
  getItem("Branch Pictures", "12", <SlPicture size="1.1rem" />),
  getItem("Reviews", "13", <MdOutlineReviews size="1.1rem" />),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const LeftMenuBar: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 230, fontSize: 15 }}
      items={items}
      className="min-h-screen"
    />
  );
};

export default LeftMenuBar;
