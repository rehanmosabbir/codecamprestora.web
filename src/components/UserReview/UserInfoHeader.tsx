import { Popconfirm } from "antd";
import { MdDelete } from "react-icons/md";
import {UserInfo} from "./UserInfo";
export const UserInfoHeader = () => {
    return (
        <div className="flex justify-between p-5">
        <div className="flex items-center"> 
        <UserInfo/>
        <h2 className="font-semibold text-[20px]"> John Doe</h2>
        </div>
        
        <Popconfirm
          title={"Sure to Delete?"}
          //onConfirm={() => handleDelete(record.key)}
        >
          <button className="bg-purple-100 hover:bg-purple-700 active:bg-purple-100 px-1 h-5 rounded-lg text-[12px] text-purple-700 hover:text-white transition">
              <MdDelete />
          </button>
        </Popconfirm>
      </div>
    )
}