import { Popconfirm } from "antd";
import restora from "@/assets/berry.png";
import Image from "next/image";
import { HiDotsVertical } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";
export const RestoraCommentHeader = () => {
    return (
        <div className="flex justify-between px-4 pt-4">
        <div className="flex items-center"> 
        <div className="flex justify-center items-center">
      <div>
        <Image
          className="rounded-3xl mr-3 -ml-2"
          src={restora}
          alt={"images"}
          width={30}
          height={30}
          priority
        />
      </div>
    </div>
        <h2 className="font-semibold text-[15px] mr-2">Restora</h2>
        <div className="flex items-center text-gray-400"> <GoDotFill /><h6> active</h6> </div>
        </div>
        <Popconfirm
          title={"Sure to Delete?"}
          //onConfirm={() => handleDelete(record.key)}
        >
          <button className="bg-purple-100 hover:bg-purple-700 active:bg-purple-100 px-1 h-5 rounded-lg text-[12px] text-purple-700 hover:text-white transition">
          <HiDotsVertical />
          </button>
        </Popconfirm>
      </div>
    )
}