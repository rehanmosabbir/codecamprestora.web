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
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      food: {
        foodName: "Hamburger",
        quantity: 5,
      },
      customerName: "James",
      phone: "01762946384",
      seats: 5,
      date: "5 Jan 2024",
      time: "3:00 PM",
      comment: "Tasty",
      price: {
        foodPrice: 50,
        discount: 5,
        totalPrice: 45,
      },
      status: "",
    },
    {
      food: {
        foodName: "Pizza",
        quantity: 2,
      },
      customerName: "John",
      phone: "01698543895",
      seats: 8,
      date: "10 Jan 2024",
      time: "4:00 PM",
      comment: "Better",
      price: {
        foodPrice: 80,
        discount: 10,
        totalPrice: 70,
      },
      status: "",
    },
    {
      food: {
        foodName: "Sandwich",
        quantity: 3,
      },
      customerName: "Clark",
      phone: "01558479854",
      seats: 4,
      date: "15 Jan 2024",
      time: "5:00 PM",
      comment: "Nice",
      price: {
        foodPrice: 50,
        discount: 10,
        totalPrice: 40,
      },
      status: "",
    },
  ]);

  const columns = [
    {
      title: "Food Items",
      dataIndex: "food",
      render: (_: DataType, record: DataType) => (
        <div>
          <p>
            <span className="font-semibold">Name :</span> {record.food.foodName}
          </p>
          <p>
            <span className="font-semibold">Quantity :</span>{" "}
            {record.food.quantity}
          </p>
        </div>
      ),
    },
    {
      title: "Customer's Name",
      dataIndex: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Number of Seats",
      dataIndex: "seats",
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
      width: 200,
    },
    {
      title: "Total Price",
      dataIndex: "price",
      render: (_: DataType, record: DataType) => (
        <div>
          <p>
            <span className="font-semibold">Price :</span>{" "}
            {record.price.foodPrice} Tk
          </p>
          <p>
            <span className="font-semibold">Discount :</span>{" "}
            {record.price.discount} Tk
          </p>
          <p>
            <span className="font-bold">Total Price :</span>{" "}
            {record.price.totalPrice} Tk
          </p>
        </div>
      ),
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
        render: (_: DataType, record: DataType) => ({
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
    <div>
      <div className="bg-white font-[500] text-lg p-5 rounded-lg">
        Orders List
      </div>
      <Form form={form} component={false}>
        <Table
          scroll={{ x: 1300 }}
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
