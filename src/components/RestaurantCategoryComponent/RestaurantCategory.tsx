import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import { Button, Form, Popconfirm, Table, Typography, message } from "antd";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { TbPencilCancel } from "react-icons/tb";
import EditableCell from "./CategoriesEditable";
import Row from "./CategoriesAddRow";
import { DragEndEvent } from "@dnd-kit/core";
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { DataType } from "./Types/CategoryTypes";
import { PlusOutlined } from "@ant-design/icons";

type DataSourceItem = DataType[];

const getBase64 = (img: RcFile, callback: (base64: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLT5M = file.size / 1024 / 1024 < 5;
  if (!isLT5M) {
    message.error("Image must less than 5MB!");
  }
  return isJpgOrPng && isLT5M;
};

const defaultImageSrc =
  "https://cdn-icons-png.flaticon.com/512/1996/1996055.png?ga=GA1.1.1713970303.1705205371&";

export const RestaurantCategories: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataSourceItem>([
    {
      key: "1",
      name: "Fast food",
      image: {
        name: "",
        type: "",
        size: 0,
        base64: "",
      },
    },
    {
      key: "2",
      name: "Vegetable",
      image: {
        name: "",
        type: "",
        size: 0,
        base64: "",
      },
    },
    {
      key: "3",
      name: "Drinks",
      image: {
        name: "",
        type: "",
        size: 0,
        base64: "",
      },
    },
  ]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const isEditing = (record: DataType) => record.key === editingKey;

  const handleOnFinish = (values: DataType) => {
    console.log("Received values:", values);
  };

  const UploadButtonInput: React.FC<{
    isDisabled: boolean;
    record: DataType;
  }> = ({ isDisabled, record }) => {
    const handleImageChange: UploadProps["onChange"] = (
      info: UploadChangeParam<UploadFile>
    ) => {
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj as RcFile, (base64) => {
          const { name, type, size } = info.file.originFileObj as RcFile;
          setDataSource((prevDataSource) => {
            const newData = prevDataSource.map((item: DataType) =>
              item.key === record.key
                ? {
                    ...item,
                    image: { ...item.image, name, type, size, base64 },
                  }
                : item
            );
            return newData;
          });
        });
      }
    };
    return (
      <Upload
        beforeUpload={beforeUpload}
        listType="picture-card"
        showUploadList={false}
        onChange={handleImageChange}
        disabled={!isDisabled}
      >
        {record?.image?.base64 ? (
          <img
            height={200}
            width={200}
            className="p-1 rounded-lg"
            src={record?.image?.base64}
            alt="Restaurant Image"
          />
        ) : (
          <div
            style={{
              height: 50,
              width: 50,
              backgroundImage: `url(${defaultImageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        )}
      </Upload>
    );
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
      const row = (await form.validateFields()) as DataType;
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        const dataToLog = newData.map(({ key, ...rest }) => rest);
        console.log(dataToLog);
        setDataSource(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        const dataToLog = newData.map(({ key, ...rest }) => rest);
        console.log(dataToLog);
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleAdd = () => {
    const maxKey = Math.max(...dataSource.map((item) => parseInt(item.key)));
    const newKey = (maxKey === -Infinity ? 0 : maxKey) + 1;
    const newData: DataType = {
      key: newKey.toString(),
      name: "",
      image: {
        name: "",
        type: "",
        size: 0,
        base64: "",
      },
    };
    edit(newData);
    setDataSource([...dataSource, newData]);
  };

  const handleDelete = (key: string) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const columns = [
    {
      key: "sort",
      width: 50,
      align: "center" as const,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Category Image",
      dataIndex: "image",
      render: (value: string, record: DataType, rowIndex: number) => {
        const isDisabled = isEditing(record);
        return <UploadButtonInput isDisabled={isDisabled} record={record} />;
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: 175,
      render: (_: DataType, record: DataType) => {
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
              <button className="bg-red-500 hover:bg-red-600 active:bg-red-500 px-2 py-1 rounded text-white transition">
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
              <button className="bg-red-500 hover:bg-red-600 active:bg-red-500 px-2 py-1 rounded text-white transition">
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

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        const updatedDataSource = arrayMove(previous, activeIndex, overIndex);
        const updatedDisplayOrder = updatedDataSource.map((item, index) => {
          return {
            ...item,
            displayOrder: index + 1,
          };
        });
        return updatedDisplayOrder;
      });
    }
  };

  return (
    <div>
      <div className="bg-white font-[500] text-lg p-5 rounded-lg">
        <span className="sm:inline-block hidden">Restaurant</span> Categories
        <Button onClick={handleAdd} type="primary" style={{ float: "right" }}>
          Add Item
        </Button>
      </div>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={dataSource.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Form form={form} component={false} onFinish={handleOnFinish}>
            <Table
              style={{ position: "relative", zIndex: "0" }}
              scroll={{ x: 600 }}
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
