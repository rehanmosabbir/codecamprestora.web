import React, { useState } from "react";
import { Button, Modal, Select, Space, Table } from "antd";
import { DataType } from "./types/OrderCreationTypes";
import OrderCreationModal from "./OrderCreationModal";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const SelectOption: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <Space wrap>
    <Select
      defaultValue="placed"
      style={{ width: 120, position: "relative", zIndex: 1, ...style }}
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

export const OrderCreation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      food: {
        foodName: "Hamburger",
        quantity: 5,
      },
      customerName: "James",
      phone: "01762946384",
      seats: 5,
      price: {
        foodPrice: 50,
        discount: 5,
        totalPrice: 45,
      },
    },
    {
      food: {
        foodName: "Pizza",
        quantity: 2,
      },
      customerName: "John",
      phone: "01698543895",
      seats: 8,
      price: {
        foodPrice: 80,
        discount: 10,
        totalPrice: 70,
      },
    },
    {
      food: {
        foodName: "Sandwich",
        quantity: 3,
      },
      customerName: "Clark",
      phone: "01558479854",
      seats: 4,
      price: {
        foodPrice: 50,
        discount: 10,
        totalPrice: 40,
      },
    },
  ]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Food Item",
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
      <div className="bg-white font-[500] text-lg p-5 sm:p-5 rounded-lg">
        Create Orders
        <Button onClick={showModal} type="primary" style={{ float: "right" }}>
          Add Order
        </Button>
        <Modal
          visible={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
        >
          {isModalOpen && <OrderCreationModal onCancel={handleCancel} />}{" "}
        </Modal>
      </div>
      <Table
        scroll={{ x: "800px" }}
        bordered
        rowKey="key"
        columns={mergedColumns}
        dataSource={dataSource}
        rowClassName={"editable-row"}
      />
    </div>
  );
};
