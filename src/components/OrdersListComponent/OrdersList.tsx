import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, Space, Table } from "antd";

interface DataType {
  foodItem: string;
  quantity: string;
  name: string;
  phone: string;
  seat: string;
  date: string;
  time: string;
  comment: string;
  price: string;
  status: string[];
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row = (props: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const App: React.FC = () => (
  <Space wrap>
    <Select
      defaultValue="placed"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: "placed", label: "Placed" },
        { value: "inProgress", label: "In Progress" },
        { value: "served", label: "Served" },
      ]}
    />
  </Space>
);

export const OrdersList: React.FC = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

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
      status: [],
    };
    setDataSource([...dataSource, newData]);
  };

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
    <div className="bg-gray-100 min-h-[calc(100vh-(130px))] rounded-lg pt-5 overflow-x-scroll">
      <div className="bg-white mx-5 font-[500] text-lg p-5 rounded-lg">
        Orders List
        <Button onClick={handleAdd} type="primary" style={{ float: "right" }}>
          Add Item
        </Button>
      </div>
      <Form form={form} component={false}>
        <Table
          className="mx-5"
          components={{
            body: {
              row: Row,
            },
          }}
          bordered
          rowKey="key"
          columns={mergedColumns}
          dataSource={dataSource}
          rowClassName={"editable-row"}
        />
      </Form>
    </div>
  );
};
