import { useState } from "react";
import { Space, Table, Popover, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GoGear } from "react-icons/go";

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
      <div className="m-2 flex justify-between gap-2">
        <Button onClick={() => handleToggle(record.key)}>
          {record.status === "Enable" ? "Disable" : "Enable"}
        </Button>
        <Button onClick={() => handleDelete(record.key)}>Delete</Button>
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
      render: (name) => <a>{name}</a>,
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
            <a>
              <GoGear />
            </a>
          </Popover>
        </Space>
      ),
    },
  ];

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

// export default BranchList;
