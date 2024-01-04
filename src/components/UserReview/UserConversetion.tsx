import { Button, Input, Space } from "antd";
import { IoIosSend } from "react-icons/io";
import {UserCommentHeader} from "./UserCommentHeader";
import { RestoraCommentHeader } from "./RestoraCommentHeader";
import { RestoraImage } from "./RestoraImage";
const UserConversetion = () => {
  return (
    <div className="mx-5 mb-10">
      <div>
      <div className=" bg-gray-100 rounded-lg">
      <UserCommentHeader />
        <p className="rounded-md p-4 text-[20px]">
        The food was good,the steak was cooked perfectly and had a great flavor.
        environment was welcoming, great service.
        </p>
        {/* <div className="flex justify-end"><Button>reply</Button></div> */}
      </div>
      <div className=" bg-gray-100 rounded-lg mt-5">
      <RestoraCommentHeader />
        <p className="rounded-md p-4 text-[20px]">
        Thank you Sir!
        </p>
        {/* <div className="flex justify-end"><Button>reply</Button></div> */}
      </div>
      
      </div>
      
      <div className="mt-10 ml-20 ">
        <div className="flex">
          <RestoraImage />
        <Space.Compact style={{ width: '100%' ,height: '60px' }}>
      <Input defaultValue="" placeholder="Write a Comment...." />
      <Button type="primary" style={{height: '60px' }}>
        <div className="flex items-center  text-[20px] ">
            <IoIosSend />
            send
        </div>
      </Button>
    </Space.Compact>
        </div>
       
      </div>
    </div>
  );
};

export default UserConversetion;
