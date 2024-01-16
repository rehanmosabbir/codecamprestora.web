import { useState } from "react";
import { Space, Table, Popover, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GoGear } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { BranchCreation } from "../BranchCreationComponent/BranchCreation";
import Link from "next/link";

interface DataType {
  key: string;
  branchName: string;
  status?: string;
}

export const BranchList = () => {
  const [data, setData] = useState<DataType[]>([
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
  ]);

  const handleDelete = (keyToDelete: string) => {
    const updatedData = data.filter((item) => item.key !== keyToDelete);
    setData(updatedData);
  };

  const content = (record: DataType) => (
    <div className="border-t-[1px] border-gray-200">
      <div className="m-2 flex justify-evenly">
        <button onClick={() => handleToggle(record.key)}>
          {record.status === "Enable" ? (
            <button className="bg-red-500 hover:bg-red-400 active:bg-red-500 px-2 py-1 rounded text-white transition">
              <div className="flex items-center">
                <AiTwotoneCloseCircle /> Disable
              </div>
            </button>
          ) : (
            <button className="bg-green-500 hover:bg-green-400 active:bg-green-500 px-2 py-1 rounded text-white transition">
              <div className="flex items-center">
                <AiTwotoneCheckCircle /> Enable
              </div>
            </button>
          )}
        </button>
        {/* <Button onClick={() => handleDelete(record.key)} >Delete</Button> */}
        <button
          onClick={() => handleDelete(record.key)}
          className="bg-red-500 hover:bg-red-400 active:bg-red-500 px-2 py-1 rounded text-white transition"
        >
          <div className="flex items-center">
            <MdDelete />
            Delete
          </div>
        </button>
      </div>
    </div>
  );

  const handleToggle = (key: string) => {
    const updatedData = data.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          status: item.status === "Enable" ? "Disable" : "Enable",
        };
      }
      return item;
    });
    setData(updatedData);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "name",
      render: (name) => <Link href="/branches/123/info">{name}</Link>,
    },
    {
      title: "Restaurant Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popover
            content={content(record)}
            placement="right"
            title="Action"
            trigger="click"
          >
            <Button type="primary" className="text-white">
              <GoGear />
            </Button>
          </Popover>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between bg-white p-5 rounded-lg">
        <h2 className="  font-[500] text-lg ">
          <span className="sm:inline-block hidden">Restaurant</span> Branch List
        </h2>
        <BranchCreation />
      </div>
      <Table
        bordered
        scroll={{ x: 400 }}
        columns={columns}
        dataSource={data}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};
