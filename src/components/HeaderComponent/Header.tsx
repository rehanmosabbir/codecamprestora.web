import { AppLogo } from "./Icons/Logo";
import React from "react";
import { Popover } from "antd";
import { User } from "./User/User";
import { Account } from "./User/Account";
import { Restaurant } from "./User/Restaurant";
import { Logout } from "./User/Logout";

const content = (
  <div>
    <p>
      <Account />
    </p>
    <p>
      <Restaurant />
    </p>
    <p>
      <Logout />
    </p>
  </div>
);

export const Header = () => {
  return (
    <div className="h-20 grid grid-cols-2 px-5 sticky top-0 bg-white">
      <div className="flex justify-start items-center">
        <AppLogo />
      </div>
      <div className="flex justify-end items-center">
        <Popover content={content} title="CodeCamp Dev" trigger="click">
          <button className="py-2 px-5 flex justify-center items-center rounded-3xl bg-gray-200 fill-blue-700 hover:bg-blue-700 active:bg-blue-500 hover:fill-gray-200 duration-300">
            <User />
          </button>
        </Popover>
      </div>
    </div>
  );
};
