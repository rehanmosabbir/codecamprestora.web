import React, { Key, useState } from "react";
import type { TableProps } from "antd";
import { Table } from "antd";
import type { ColumnsType, FilterValue } from "antd/es/table/interface";

interface DataType {
  key: string;
  name: string;
  role: string;
  email: string;
  branch: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "Maheen",
    role: "Waiter",
    email: "mehedi@gmail.com",
    branch: "Dhanmondi",
  },
  {
    key: "2",
    name: "Masud",
    role: "Manager",
    email: "mehedi@gmail.com",
    branch: "Banani",
  },
  {
    key: "3",
    name: "Ahmed",
    role: "kitchen Stuff",
    email: "ah@gmail.com",
    branch: "Dhanmondi",
  },
  {
    key: "4",
    name: "Shafayet",
    role: "Waiter",
    email: "mehedi@gmail.com",
    branch: "Bangla Motor",
  },
];

const RestaurantUsersList = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      filters: [
        { text: "Waiter", value: "Waiter" },
        { text: "Manager", value: "Manager" },
        { text: "kitchen Stuff", value: "kitchen Stuff" },
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record: DataType) =>
        record.role.indexOf(value as string) === 0,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      filters: [
        { text: "Dhanmondi", value: "Dhanmondi" },
        { text: "Banani", value: "Banani" },
        { text: "Bangla Motor", value: "Bangla Motor" },
      ],
      filteredValue: filteredInfo.branch || null,
      onFilter: (value, record) => record.branch.includes(value as string),
    },
  ];

  return (
    <div>
      <div className="bg-white font-[500] text-lg p-5 rounded-lg">
        Restaurent Users List
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        onChange={handleChange}
      />
    </div>
  );
};

export default RestaurantUsersList;
