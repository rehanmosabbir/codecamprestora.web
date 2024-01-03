import React, { useState } from "react";
import { Button, Form, Select, Space, Table } from "antd";
import { DataType } from "./Types/OrdersListTypes";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const SelectOption: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <Space wrap>
    <Select
      defaultValue="placed"
      style={{ width: 120, position: "relative", zIndex: 10, ...style }}
      onChange={handleChange}
      options={[
        {
          value: "placed",
          label: "Placed",
        },
        {
          value: "inProgress",
          label: "In Progress",
        },
        {
          value: "served",
          label: "Served",
        },
        {
          value: "canceled",
          label: "Canceled",
        },
      ]}
    />
  </Space>
);

export const OrdersList: React.FC = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [form] = Form.useForm();

  //Will be Deleted whenever database is connected
  const handleAdd = () => {
    const newData: DataType = {
      quantity: "",
      name: "",
      phone: "",
      seat: "",
      date: "",
      time: "",
      comment: "",
      foodItem: "",
      price: "",
      status: "",
    };
    setDataSource([...dataSource, newData]);
  };
  //Will be Deleted whenever database is connected

  const columns = [
    {
      title: "Food Items",
      dataIndex: "foodItem",
    },
    {
      title: "Customer's Name",
      dataIndex: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Number of Seats",
      dataIndex: "seat",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Comment",
      dataIndex: "comment",
    },
    {
      title: "Total Price",
      dataIndex: "price",
    },
    {
      title: "Order Status",
      dataIndex: "status",
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (col.dataIndex === "status") {
      return {
        ...col,
        render: (_: any, record: DataType) => ({
          children: <SelectOption />,
        }),
      };
    }

    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === "key" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-(130px))] rounded-lg">
      <div className="bg-white font-[500] text-lg p-5 rounded-lg">
        Orders List
        {/* Will be Deleted whenever database is connected */}
        <Button onClick={handleAdd} type="primary" style={{ float: "right" }}>
          Add Item
        </Button>
        {/* Will be Deleted whenever database is connected */}
      </div>
      <Form form={form} component={false}>
        <Table
          scroll={{ x: 1200 }}
          style={{ position: "relative", zIndex: 0 }}
          bordered
          rowKey="key"
          columns={mergedColumns}
          dataSource={dataSource}
        />
      </Form>
    </div>
  );
};
