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
  Dropdown,
  Form,
  Input,
  InputNumber,
  MenuProps,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { DownOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
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

interface EditableCellProps {
  editing: boolean;
  dataIndex: keyof DataType;
  title: any;
  inputType: "number" | "text" | "select" | "date" | "timeRange";
  record: DataType;
  index: number;
  children: React.ReactNode;
  handleSelectChange: (
    name: keyof DataType,
    value: string,
    record: DataType
  ) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  handleSelectChange,
  ...restProps
}) => {
  const items = ["Placed", "In Progress", "Served"];

  const renderInputNode = () => {
    if (inputType === "number") {
      return <InputNumber />;
    }

    if (inputType === "select") {
      return (
        <Select
          value={record[dataIndex]}
          onChange={(value: any) =>
            handleSelectChange(dataIndex, value, record)
          }
        >
          {items.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      );
    }

    return <Input />;
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex as string}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {renderInputNode()}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;

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

export const OrdersList: React.FC = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

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

  const [count, setCount] = useState<number>(1);

  const handleAdd = () => {
    const newData: DataType = {
      key: count.toString(),
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
    setCount(count + 1);
  };

  const columns = [
    {
      title: "Food Items",
      dataIndex: "foodItem",
      editable: false,
    },
    {
      title: "Customer's Name",
      dataIndex: "name",
      editable: false,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      editable: false,
    },
    {
      title: "Number of Seats",
      dataIndex: "seat",
      editable: false,
    },
    {
      title: "Date",
      dataIndex: "date",
      editable: false,
    },
    {
      title: "Time",
      dataIndex: "time",
      editable: false,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      editable: false,
    },
    {
      title: "Total Price",
      dataIndex: "price",
      editable: false,
    },
    {
      title: "Order Status",
      dataIndex: "status",
      editable: true,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === "key" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous: any) => {
        const activeIndex = previous.findIndex((i: any) => i.key === active.id);
        const overIndex = previous.findIndex((i: any) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-(130px))] rounded-lg pt-5 overflow-x-scroll">
      <div className="bg-white mx-5 font-[500] text-lg p-5 rounded-lg">
        Orders List
        <Button onClick={handleAdd} type="primary" style={{ float: "right" }}>
          Add Item
        </Button>
      </div>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={dataSource.map((i: any) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Form form={form} component={false}>
            <Table
              className="mx-5"
              components={{
                body: {
                  row: Row,
                  cell: EditableCell,
                },
              }}
              bordered
              rowKey="key"
              columns={mergedColumns}
              dataSource={dataSource}
              rowClassName={"editable-row"}
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </SortableContext>
      </DndContext>
    </div>
  );
};
