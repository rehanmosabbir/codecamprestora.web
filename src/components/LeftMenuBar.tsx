import React, { useState } from "react";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineRestaurantMenu, MdOutlineReviews } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { SlPicture } from "react-icons/sl";
import { LuClipboardList } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/router";

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

const menuItems: MenuItem[] = [
  getItem("Branch Details", "branch-details", <TbListDetails size="1.1rem" />),
  getItem("Branch Users", "branch-users", <FaUsers size="1.1rem" />),
  getItem("Menu", "menu", <MdOutlineRestaurantMenu size="1.1rem" />),
  getItem("Orders List", "order-list", <LuClipboardList size="1.1rem" />),
  getItem("Branch Pictures", "branch-pictures", <SlPicture size="1.1rem" />),
  getItem("Reviews", "reviews", <MdOutlineReviews size="1.1rem" />),
];

const rootItems: MenuItem[] = [
  getItem("Branch List", "branch-list", <TbListDetails size="1.1rem" />),
  getItem("Catagories", "catagories", <BiCategory size="1.1rem" />),
];

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const LeftMenuBar: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const router = useRouter();
  const showMenu = router.pathname.includes("/branchlist/[branchid]");

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
      style={{
        fontSize: 15,
        paddingRight: 10,
        paddingLeft: 10,
        border: 0,
      }}
      items={showMenu ? menuItems : rootItems}
    />
  );
};

export default LeftMenuBar;
