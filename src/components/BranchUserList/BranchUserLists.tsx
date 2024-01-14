import React, { useState } from "react";
import EditableCell from "./UserListsEditable";
import { DataType } from "./branchtype";
import type { DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { TbPencilCancel } from "react-icons/tb";
import Row from "./BranchRow";
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
      role: "Waiter",
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
      role: "Waiter",
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
        console.log(newData);
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const [count, setCount] = useState<number>(5);

  const handleAdd = () => {
    const newData: DataType = {
      key: count.toString(),
      username: "",
      role: "",
      email: "",
      password: "",
    };
    edit(newData);
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
      key: "sort",
      width: 50,
      align: "center" as const,
    },
    {
      title: "User Name",
      dataIndex: "username",
      editable: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      //editable: true,
      filters: [
        { text: "Waiter", value: "Waiter" },
        { text: "Manager", value: "Manager" },
        { text: "kitchen Stuff", value: "kitchen Stuff" },
      ],

      render: (_: any, record: DataType, key: number) => {
        const handleRoleChange = (value: string, key: number) => {
          const updatedData = [...dataSource];
          updatedData[key].role = value;
          setDataSource(updatedData);
        };
        const editable = isEditing(record);
        return editable ? (
          <Space wrap>
            <Select
              defaultValue={`Select Value ${record.role}`}
              style={{ width: 180 }}
              options={[
                { value: "Manager", label: "Manager" },
                { value: "Waiter", label: "Waiter" },
                { value: "Kitchen Staff", label: "Kitchen Staff" },
              ]}
              onChange={(value) => handleRoleChange(value, key)}
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
      width: 175,
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
    <div>
      <div className="bg-white font-[500] text-lg p-5 rounded-lg">
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
              scroll={{ x: 900 }}
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
