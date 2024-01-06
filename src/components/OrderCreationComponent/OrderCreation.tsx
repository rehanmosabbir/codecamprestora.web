import React, { useState } from "react";
import { Button, Modal, Table } from "antd";
import { DataType } from "./types/OrderCreationTypes";
import OrderCreationModal from "./OrderCreationModal";

export const OrderCreation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      food: {
        foodName: "Burger",
        quantity: "5",
      },
      customerName: "James",
      phone: "01762946384",
      seats: "5",
      price: {
        foodPrice: "$50",
        discount: "$5",
        totalPrice: "$45",
      },
    },
    {
      food: {
        foodName: "Pizza",
        quantity: "2",
      },
      customerName: "John",
      phone: "01698543895",
      seats: "8",
      price: {
        foodPrice: "$80",
        discount: "$10",
        totalPrice: "$70",
      },
    },
    {
      food: {
        foodName: "Sandwich",
        quantity: "3",
      },
      customerName: "Clark",
      phone: "01558479854",
      seats: "4",
      price: {
        foodPrice: "$50",
        discount: "$0",
        totalPrice: "$10",
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
            {record.price.foodPrice}
          </p>
          <p>
            <span className="font-semibold">Discount :</span>{" "}
            {record.price.discount}
          </p>
          <p>
            <span className="font-bold">Total Price :</span>{" "}
            {record.price.totalPrice}
          </p>
        </div>
      ),
    },
  ];

  const mergedColumns = columns.map((col) => {
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
    <div className="bg-gray-100  rounded-lg">
      <div className="bg-white font-[500] text-lg p-5 sm:p-5 rounded-lg">
        Create Orders
        <Button onClick={showModal} type="primary" style={{ float: "right" }}>
          Add Order
        </Button>
        <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
          <OrderCreationModal />
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
