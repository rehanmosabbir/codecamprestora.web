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
import useHeaderStore from "@/useHeaderStore";

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
  getItem("Branch Details", "info", <TbListDetails size="1.1rem" />),
  getItem("Branch Users", "users", <FaUsers size="1.1rem" />),
  getItem("Menu", "menu", <MdOutlineRestaurantMenu size="1.1rem" />),
  getItem("Orders List", "orders", <LuClipboardList size="1.1rem" />),
  getItem("Branch Pictures", "pictures", <SlPicture size="1.1rem" />),
  getItem("Reviews", "reviews", <MdOutlineReviews size="1.1rem" />),
];

const rootItems: MenuItem[] = [
  getItem("Branch List", "branches", <TbListDetails size="1.1rem" />),
  getItem("Categories", "categories", <BiCategory size="1.1rem" />),
];

const rootSubmenuKeys = ["branches", "categories"];

const LeftMenuBar: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(["branches"]);

  const { collapsed } = useHeaderStore();

  let width = 235;
  collapsed ? (width = 60) : width;

  const router = useRouter();
  const query = router.query.branchid;

  const showMenu = router.pathname.includes("/branches/[branchid]");

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleSelect = ({ key }: { key: string }) => {
    router.push(
      showMenu
        ? {
            pathname: `/branches/[branchid]/${key}`,
            query: { branchid: query },
          }
        : `${key}`
    );
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onSelect={handleSelect}
      inlineCollapsed={collapsed}
      style={{
        width: width,
        flex: "auto",
        fontSize: 15,
        paddingRight: 8,
        paddingLeft: 8,
        border: 0,
      }}
      items={showMenu ? menuItems : rootItems}
      className="min-h-screen fixed gap-5 pr-2"
    />
  );
};

export default LeftMenuBar;
