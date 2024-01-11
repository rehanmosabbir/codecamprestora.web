import Link from "next/link";
import React, { useState } from "react";
import { AppLogo } from "../../assets/Logo";
import { Button, Popover } from "antd";
import { User } from "./User/User";
import { Account } from "./User/Account";
import { Restaurant } from "./User/Restaurant";
import { Logout } from "./User/Logout";
import { FiMenu } from "react-icons/fi";
import useHeaderStore from "@/useHooks/useHeaderStore";

const content = (
  <div className="border-t-[1px] border-gray-200">
    <Account />
    <Restaurant />
    <Logout />
  </div>
);

export const AppHeader = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const { setCollapsed } = useHeaderStore();
  return (
    <div className="h-[88px] grid grid-cols-2 sm:px-6 px-3 bg-white w-full">
      <div className="flex gap-4 sm:gap-28 justify-start items-center">
        <Link href={"/branches/"}>
          <AppLogo />
        </Link>
        <Button
          className="border-none"
          onClick={setCollapsed}
          style={{
            marginTop: 5,
            paddingLeft: 8,
            paddingRight: 8,
            border: 0,
            backgroundColor: isHovered ? "#5E35B1" : "#EDE7F6",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FiMenu
            style={{
              color: isHovered ? "#FFFFFF" : "#5E35B1",
              transition: "color 0.3s ease",
            }}
            size="1.1rem"
          />
        </Button>
      </div>
      <div className="flex justify-end items-center ">
        <Popover content={content} title="CodeCamp Dev" trigger="click">
          <button className="py-[6px] px-4 flex justify-center items-center rounded-3xl bg-sky-100 text-sky-600 hover:bg-sky-500 active:bg-sky-400 hover:text-gray-100 text-xl duration-300">
            <User />
          </button>
        </Popover>
      </div>
    </div>
  );
};
