import React, { useState } from "react";
import EditableCell from "./UserListsEditable";
import { DataType } from "./branchtype";
import type { DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { TbPencilCancel } from "react-icons/tb";
import { Row } from "./BranchRow";
import {
  Button,
  Form,
  Popconfirm,
  Table,
  Typography,
  Select,
  Space,
} from "antd";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const BranchUserLists: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "1",
      username: "Maheen",
      role: "Service",
      email: "mehedi@gmail.com",
      password: "*********",
    },
    {
      key: "2",
      username: "Masud",
      role: "manager",
      email: "mehedi@gmail.com",
      password: "*********",
    },
    {
      key: "3",
      username: "Ahmed",
      role: "kitchen Stuff",
      email: "ah@gmail.com",
      password: "*********",
    },
    {
      key: "4",
      username: "Shafayet",
      role: "Service",
      email: "mehedi@gmail.com",
      password: "*********",
    },
    {
      key: "5",
      username: "Sabbir",
      role: "kitchen Stuff",
      email: "sa@gmail.com",
      password: "*********",
    },
    {
      key: "6",
      username: "Sirajul",
      role: "kitchen Stuff",
      email: "sirj@gmail.com",
      password: "*********",
    },
    {
      key: "7",
      username: "Mehedi",
      role: "manager",
      email: "mehedi@gmail.com",
      password: "*********",
    },
  ]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({
      username: "",
      role: "",
      email: "",
      password: "",
      ...record,
    });
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

  const [count, setCount] = useState<number>(8);

  const handleAdd = () => {
    const newData: DataType = {
      key: count.toString(),
      username: "User Name",
      role: "Role",
      email: "Email",
      password: "Password",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item: any) => item.key !== key);
    setDataSource(newData);
  };
  //: ColumnsType<DataType>
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      editable: false,
    },
    {
      title: "User Name",
      dataIndex: "username",
      editable: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      editable: true,
      render: (_: any, record: DataType) => {
        const editing = isEditing(record);
        return editing ? (
          <Space wrap>
            <Select
              defaultValue="Select Role"
              style={{ width: 150 }}
              bordered={false}
              options={[
                { value: "Manager", label: "Manager" },
                { value: "Service", label: "Service" },
                { value: "Kitchen Stuff", label: "Kitchen Stuff" },
              ]}
            />
          </Space>
        ) : (
          record.role
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "Password",
      dataIndex: "password",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              <button className="bg-sky-600 hover:bg-sky-700 active:bg-sky-600 px-2 py-1 rounded text-white transition">
                <div className="flex items-center">
                  <IoMdSave />
                  Save
                </div>
              </button>
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <button className="bg-red-500 hover:bg-red-500 active:bg-red-500 px-2 py-1 rounded text-white transition">
                <div className="flex items-center">
                  <TbPencilCancel />
                  Cancel
                </div>
              </button>
            </Popconfirm>
          </span>
        ) : (
          <div className="space-x-2">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              <button className="bg-sky-600 hover:bg-sky-700 active:bg-sky-600 px-2 py-1 rounded text-white transition">
                <div className="flex items-center">
                  <RiEdit2Fill />
                  Edit
                </div>
              </button>
            </Typography.Link>
            <Popconfirm
              title={"Sure to Delete?"}
              onConfirm={() => handleDelete(record.key)}
            >
              <button className="bg-red-500 hover:bg-red-500 active:bg-red-500 px-2 py-1 rounded text-white transition">
                <div className="flex items-center">
                  <MdDelete />
                  Delete
                </div>
              </button>
            </Popconfirm>
          </div>
        );
      },
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
        inputType: col.dataIndex,
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
        Users List
        <Button onClick={handleAdd} type="primary" style={{ float: "right" }}>
          Add User
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
