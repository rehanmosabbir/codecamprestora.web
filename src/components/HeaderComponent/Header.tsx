import Link from "next/link";
import React, { useState } from "react";
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
    <div className="h-[88px] grid grid-cols-2 sm:px-6 px-3 bg-white">
      <div className="flex justify-start items-center invisible md:visible">
        <Link href={"/dashboard/"}>
          <AppLogo />
        </Link>
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
