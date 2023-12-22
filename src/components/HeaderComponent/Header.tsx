import React from "react";
import Link from "next/link";
import { AppLogo } from "./HeaderIcons/Logo";
import { Popover } from "antd";
import { User } from "./User/User";
import { Account } from "./User/Account";
import { Restaurant } from "./User/Restaurant";
import { Logout } from "./User/Logout";

const content = (
  <div className="border-t-[1px] border-gray-200">
    <Account />
    <Restaurant />
    <Logout />
  </div>
);

export const Header = () => {
  return (
    <div className="h-[88px] grid grid-cols-2 sm:px-6 px-3 sticky top-0 bg-white">
      <div className="flex justify-start items-center ">
        <Link href={"/dashboard/default/"}>
          <AppLogo />
        </Link>
      </div>
      <div className="flex justify-end items-center ">
        <Popover content={content} title="CodeCamp Dev" trigger="click">
          <button className="py-[6px] px-4 flex justify-center items-center rounded-3xl bg-gray-200 fill-blue-700 hover:bg-blue-700 active:bg-blue-500 hover:fill-gray-200 duration-300">
            <User />
          </button>
        </Popover>
      </div>
    </div>
  );
};
