import React, { useState } from "react";
import { Button, Form, Modal, Select, Space, Table } from "antd";
import { DataType } from "./Types/OrdersListTypes";
import OrderCreationModal from "./OrderCreationModal";
import { useQuery } from "react-query";
import axios from "axios";
import { pageSize, path } from "@/services/ordersListService";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const branchId = router?.query?.branchid;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [pageParameter, setPageParameter] = useState(1);

  const {
    data: apiResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders-list", { pageParameter }],
    queryFn: async ({ queryKey }) => {
      const pageNumber =
        (queryKey[1] as { pageParameter?: number })?.pageParameter || 1;

      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}${path}${branchId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
        );

        console.log(result.data.data.data);

        return result.data.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    staleTime: 10000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const dataSource = apiResponse || [];

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
            <span className="font-semibold">Delivery :</span>{" "}
            {record.deliveryCharge} Tk
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

  const tablePagination = {
    total: (apiResponse?.totalPages || 1) * pageSize,
    onChange: async (page: number) => {
      setPageParameter(page);
      await refetch();
    },
    pageSize: 10,
  };
  console.log("Total Pages:", apiResponse);

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
          pagination={tablePagination}
        />
      </Form>
    </div>
  );
};
