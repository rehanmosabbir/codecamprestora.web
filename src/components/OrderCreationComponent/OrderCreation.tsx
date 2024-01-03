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
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { TbPencilCancel } from "react-icons/tb";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  picture: any;
  name: string;
  description: string;
  ingredients: string;
  price: string;
  category: string;
  isAvailable: boolean;
  extraInfo: {
    additionalInfo1: string;
    additionalInfo2: string;
  };
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

export const OrderCreation: React.FC = () => {
  const [dataSource, setDataSource] = useState<any>([
    {
      food: "",
      name: "James",
      price: "price 1",
      phone: "01762946384",
    },
    {
      food: "",
      name: "John",
      price: "price 1",
      phone: "01698543895",
    },
    {
      food: "",
      name: "Devid",
      price: "price 1",
      phone: "01558479854",
    },
  ]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;

      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // const handleAdd = () => {
  //   const newData: DataType = {
  //     picture: "",
  //     name: "",
  //     description: "",
  //     ingredients: "",
  //     price: "",
  //     category: "",
  //     isAvailable: true,
  //     key: "",
  //     extraInfo: "",
  //   };
  //   setDataSource([...dataSource, newData]);
  // };

  const columns = [
    {
      title: "Food Items",
      dataIndex: "extraInfo",
      render: (_: any, record: DataType) => (
        <div>
          <p>
            <span className="font-bold">Name :</span>{" "}
            {record.extraInfo?.additionalInfo1 || "Burger"}
          </p>
          <p>
            <span className="font-bold">Quantity :</span>{" "}
            {record.extraInfo?.additionalInfo2 || "2"}
          </p>
        </div>
      ),
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
      title: "Total Price",
      dataIndex: "extraInfo",
      render: (_: any, record: DataType) => (
        <div>
          <p>
            <span className="font-semibold">Price :</span>{" "}
            {record.extraInfo?.additionalInfo1 || "50 $"}
          </p>
          <p>
            <span className="font-semibold">Discount :</span>{" "}
            {record.extraInfo?.additionalInfo1 || "5 $"}
          </p>
          <p>
            <span className="font-bold">Total Price :</span>{" "}
            {record.extraInfo?.additionalInfo2 || "45 $"}
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
      <div className="bg-white font-[500] text-lg p-5 rounded-lg">
        Create Orders
        <Button
          //  onClick={handleAdd}
          type="primary"
          style={{ float: "right" }}
        >
          Add Order
        </Button>
      </div>

      <Form form={form} component={false}>
        <Table
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
