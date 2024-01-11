import { Popconfirm, Popover } from "antd";
import { HiDotsVertical } from "react-icons/hi";
import { UserInfo } from "./UserInfo";
import { useState } from "react";
export const UserInfoHeader = () => {
  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const content = () => (
    <div>
      <div className="m-2 flex justify-evenly">
        <button onClick={handleToggle}>
          {isActive ? (
            <button className="bg-red-500 hover:bg-red-400 active:bg-red-500 px-2 py-1 rounded text-white transition">
              <div className="flex items-center">
                 Deactive
              </div>
            </button>
          ) : (
            <button className="bg-green-500 hover:bg-green-400 active:bg-green-500 px-2 py-1 rounded text-white transition">
              <div className="flex items-center">
                Active
              </div>
            </button>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex justify-between p-5">
      <div className="flex items-center">
        <UserInfo />
        <h2 className="font-semibold text-[20px] mr-2"> John Doe</h2>
        {isActive ? (
          <div className="flex items-center text-white bg-green-500 py-1 px-2 text-[10px] rounded-lg">
            <p>active</p>
          </div>
        ) : (
          <div className="flex items-center text-white bg-red-500 py-1 px-2 text-[10px] rounded-lg">
            <p>inactive</p>
          </div>
        )}
      </div>

      <Popover content={content} placement="bottom" trigger="click">
        <button className="bg-purple-100 hover:bg-purple-700 active:bg-purple-100 px-1 h-5 rounded-lg text-[12px] text-purple-700 hover:text-white transition">
          <HiDotsVertical />
        </button>
      </Popover>
    </div>
  );
};
