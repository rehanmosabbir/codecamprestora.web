import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import { Button, Form, Popconfirm, Table, Typography } from "antd";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { TbPencilCancel } from "react-icons/tb";
import EditableCell from "./CategoriesEditable";
import Row from "./CategoriesAddRow";
import Picture from "./CategoriesPicture";
import { DragEndEvent } from "@dnd-kit/core";
import { RcFile, UploadFile } from "antd/es/upload";

export const RestaurantCategories: React.FC = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: DataType) => record.key === editingKey;

  const handleOnFinish = (values: any) => {
    console.log("Received values:", values);
  };

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", image: {}, ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const formData = await form.validateFields();
      const { name, image } = formData;

      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        newData.splice(index, 1, {
          ...newData[index],
          name,
          image,
        });
        setDataSource(newData);
        setEditingKey("");
        console.log("Updated Data:", newData);
        form.submit();
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const [count, setCount] = useState<number>(1);

  const handleAdd = () => {
    const newData: DataType = {
      key: count.toString(),
      name: "",
      image: "",
    };
    edit(newData);
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item: any) => item.key !== key);
    setDataSource(newData);
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      editable: false,
    },
    {
      title: "Restaurant Name",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Restaurant Image",
      dataIndex: "image",
      render: (_: any, record: DataType) => (
        <Picture
          updateDataSource={(key: string, file: RcFile) => {
            const updatedData = dataSource.map((item: DataType) =>
              item.key === key ? { ...item, image: file } : item
            );
            setDataSource(updatedData);
          }}
          currentData={{
            key: "",
            image: "",
          }}
        />
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => {
                save(record.key);
              }}
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
      setDataSource((previous: any[]) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-(130px))] rounded-lg pt-5">
      <div className="bg-white mx-5 font-[500] text-lg p-5 rounded-lg">
        Restaurant Categories
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
          <Form form={form} component={false} onFinish={handleOnFinish}>
            <Table
              className="mx-5 min-w-[700px] text-center"
              style={{ position: "relative", zIndex: "0" }}
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
