import { Popconfirm } from "antd";
import { MdDelete } from "react-icons/md";
import user from "@/assets/user.jpg";
import Image from "next/image";
export const UserCommentHeader = () => {
    return (
        <div className="flex justify-between px-4 pt-4">
        <div className="flex items-center"> 
        <div className="flex justify-center items-center">
      <div>
        <Image
          className="rounded-3xl mr-3 -ml-2"
          src={user}
          alt={"images"}
          width={35}
          height={35}
          priority
        />
      </div>
    </div>
        <h2 className="font-semibold text-[15px]"> John Doe</h2>
        </div>
        <Popconfirm
          title={"Sure to Delete?"}
          //onConfirm={() => handleDelete(record.key)}
        >
          <button className="bg-gray-200 hover:bg-gray-200 active:bg-gray-200 px-1 py-1 rounded-lg text-white transition">
            <div className="flex items-center">
              <MdDelete />
            </div>
          </button>
        </Popconfirm>
      </div>
    )
}