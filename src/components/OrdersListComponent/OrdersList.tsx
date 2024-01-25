import React, { useState } from "react";
import { Button, Form, Modal, Select, Space, Table } from "antd";
import { DataType } from "./Types/OrdersListTypes";
import OrderCreationModal from "./OrderCreationModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      customerName: "John",
      phone: "01773967545",
      seats: 5,
      date: "15 Feb 2024",
      time: "02:00 PM",
      comment: "Nice",
      orderItems: [
        {
          itemName: "Hamburger",
          quantity: 5,
          unitPrice: 50,
          totalItemPrice: 250,
        },
        {
          itemName: "Cheese",
          quantity: 5,
          unitPrice: 20,
          totalItemPrice: 100,
        },
      ],
      subTotal: 350,
      discount: 5,
      delivery: 0,
      totalPrice: 345,
    },
    {
      customerName: "james",
      phone: "01556284956",
      seats: 10,
      date: "25 Mar 2024",
      time: "04:00 PM",
      comment: "Tasty",
      orderItems: [
        {
          itemName: "Hamburger",
          quantity: 5,
          unitPrice: 50,
          totalItemPrice: 250,
        },
        {
          itemName: "Cheese",
          quantity: 5,
          unitPrice: 20,
          totalItemPrice: 100,
        },
      ],
      subTotal: 350,
      discount: 5,
      delivery: 0,
      totalPrice: 345,
    },
    {
      customerName: "clark",
      phone: "01963810735",
      seats: 15,
      date: "10 Jan 2024",
      time: "10:30 AM",
      comment: "Good",
      orderItems: [
        {
          itemName: "Hamburger",
          quantity: 5,
          unitPrice: 50,
          totalItemPrice: 250,
        },
        {
          itemName: "Cheese",
          quantity: 5,
          unitPrice: 20,
          totalItemPrice: 100,
        },
      ],
      subTotal: 350,
      discount: 5,
      delivery: 0,
      totalPrice: 345,
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
      title: "Food Items",
      dataIndex: "food",
      render: (_: DataType, record: DataType) => (
        <div>
          {record.orderItems.map((item, index) => (
            <div key={index}>
              <p>
                <span className="font-semibold">Name :</span> {item.itemName}
              </p>
              <p>
                <span className="font-semibold">Price :</span> {item.unitPrice}{" "}
                x {item.quantity} = {item.totalItemPrice} Tk
              </p>
            </div>
          ))}
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
      width: 130,
    },
    {
      title: "Seats",
      dataIndex: "seats",
      width: 64,
    },
    {
      title: "Date",
      dataIndex: "date",
      width: 120,
    },
    {
      title: "Time",
      dataIndex: "time",
      width: 100,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      width: 200,
    },
    {
      title: "Total Price",
      dataIndex: "price",
      width: 180,
      render: (_: DataType, record: DataType) => (
        <div>
          <p>
            <span className="font-semibold">Sub Total :</span> {record.subTotal}{" "}
            Tk
          </p>
          <p>
            <span className="font-semibold">Discount :</span> {record.discount}{" "}
            Tk
          </p>
          <p>
            <span className="font-semibold">Delivery :</span> {record.delivery}{" "}
            Tk
          </p>
          <p>
            <span className="font-bold">Total Price :</span> {record.totalPrice}{" "}
            Tk
          </p>
        </div>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "status",
      width: 160,
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
        <Button onClick={showModal} type="primary" style={{ float: "right" }}>
          Create Order
        </Button>
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
        >
          {isModalOpen && <OrderCreationModal onCancel={handleCancel} />}{" "}
        </Modal>
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
