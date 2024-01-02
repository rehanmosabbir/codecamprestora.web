import { useState } from "react";
import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

interface DataType {
  key: string;
  UsersName: string;
  role: string;
  email: string;
  password: string;
}

export const UserList = () => {
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      UsersName: "Maheen",
      role: "Service",
      email: "mehedi@gmail.com",
      password: "*********",
    },
    {
      key: "2",
      UsersName: "Masud",
      role: "manager",
      email: "mehedi@gmail.com",
      password: "*********",
    },
    {
      key: "3",
      UsersName: "Ahmed",
      role: "kitchen Stuff",
      email: "ah@gmail.com",
      password: "*********",
    },
    {
      key: "4",
      UsersName: "Shafayet",
      role: "Service",
      email: "mehedi@gmail.com",
      password: "*********",
    },
    {
      key: "5",
      UsersName: "Sabbir",
      role: "kitchen Stuff",
      email: "sa@gmail.com",
      password: "*********",
    },
    {
      key: "6",
      UsersName: "Sirajul",
      role: "kitchen Stuff",
      email: "sirj@gmail.com",
      password: "*********",
    },
    {
      key: "7",
      UsersName: "Mehedi",
      role: "manager",
      email: "mehedi@gmail.com",
      password: "*********",
    },
  ]);

  const handleDelete = (keyToDelete: string) => {
    const updatedData = data.filter((item) => item.key !== keyToDelete);
    setData(updatedData);
  };

  const columns: ColumnsType<DataType> = [
    { title: "ID", dataIndex: "key", key: "key" },
    {
      title: "Users Name",
      dataIndex: "UsersName",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: DataType) => (
        <div>
          <div className="m-2">
            <button className="bg-sky-600 hover:bg-sky-700 active:bg-sky-600 px-2 py-1 rounded text-white transition mr-2">
              <div className="flex items-center">
                <RiEdit2Fill />
                Edit
              </div>
            </button>
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
      ),
    },
  ];

  return (
    <div className=" bg-gray-100 min-h-[calc(100vh-(130px))] rounded-lg pt-5 overflow-x-scroll">
      <div className="bg-white mx-5 font-bold text-lg p-5 rounded-lg">
        Users List
        <Button type="primary" className="" style={{ float: "right" }}>
          Add User
        </Button>
      </div>
      <Table
        className="mx-5"
        columns={columns}
        dataSource={data}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};
