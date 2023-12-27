import React from "react";
import { Space, Table, Popover, Button, Badge } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  branchName: string;
  status: string;
}
const content = (
  <div className="border-t-[1px] border-gray-200">
    <div className="m-2 flex justify-between">
      <Button>Enable</Button>
      <Button>Delete</Button>
    </div>
  </div>
);

const columns: ColumnsType<DataType> = [
  {
    title: "Branch Name",
    dataIndex: "branchName",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <Popover
          content={content}
          placement="right"
          title="Action"
          trigger="click"
        >
          <Button>Action</Button>
        </Popover>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    branchName: "Gulshan",
    status: "Enable",
  },
  {
    key: "2",
    branchName: "Bonani",
    status: "Disable",
  },
  {
    key: "3",
    branchName: "banglaMotor",
    status: "Enable",
  },
  {
    key: "4",
    branchName: "Joe Black",
    status: "Enable",
  },
  {
    key: "5",
    branchName: "Joe Black",
    status: "Disable",
  },
  {
    key: "6",
    branchName: "Joe Black",
    status: "Enable",
  },
  {
    key: "7",
    branchName: "Joe Black",
    status: "Disable",
  },
];

const BranchList = () => {
  return (
    <div className="bg-slate-100 rounded-lg">
      <div className="m-[80px] mt-1">
        <div className="flex justify-center items-center">
          <div className="w-full m-10 ">
            <h2 className=" text-[20px] text-black p-5 bg-white rounded-t-lg">
              Restaurant Branch List
            </h2>
            <Table
              columns={columns}
              dataSource={data}
              style={{ borderRadius: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchList;
