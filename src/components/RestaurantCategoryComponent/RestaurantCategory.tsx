import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import {
  Button,
  Form,
  Popconfirm,
  Space,
  Table,
  Typography,
  message,
} from "antd";
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
import axios from "axios";
import {
  path,
  pageSizes,
  updateDisplayOrder,
} from "@/services/menuCategoryService";
import { useQuery, useMutation } from "react-query";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const restaurantId = session?.user?.restaurantId;
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>([]);
  const [editingKey, setEditingKey] = useState<string>("");
  const [pageParameter, setPageParameter] = useState(1);
  const [formKey, setFormKey] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    data: apiResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["menu-category", { pageParameter }],
    queryFn: async ({ queryKey }) => {
      const pageNumber =
        (queryKey[1] as { pageParameter?: number })?.pageParameter || 1;

      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}${path}/Paginated?RestaurantId=${restaurantId}&PageNumber=${pageNumber}&PageSize=${pageSizes}`
        );

        return result.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  const dataSource = apiResponse?.data;

  const addCategoryMutation = useMutation(
    async (newData: DataType) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
        newData
      );
      return response.data;
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const saveCategoryMutation = useMutation(
    async (newData: DataType) => {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
        newData
      );
      return response.data;
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const handleAdd = async () => {
    const newDisplayOrder = data.length + 1;

    const maxKey = Math.max(...data.map((item) => parseInt(item.id)));
    const newKey = (maxKey === -Infinity ? 0 : maxKey) + 1;
    const newData: DataType = {
      id: newKey.toString(),
      name: "Enter Food Category",
      image: {
        name: "",
        type: "",
        base64Url: "",
      },
      displayOrder: newDisplayOrder,
      restaurantId: restaurantId,
    };

    try {
      await addCategoryMutation.mutateAsync(newData);

      await refetch();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const isEditing = (record: DataType) => record.id === editingKey;

  const uploadButton = (
    <div className="text-gray-400 text-center">
      <PlusOutlined />
      <p>Upload</p>
    </div>
  );

  const handleOnFinish = (values: DataType) => {
    console.log("Received values:", values);
  };

  const UploadButtonInput: React.FC<{
    isDisabled: boolean;
    record: DataType;
    editing: boolean;
  }> = ({ isDisabled, record, editing }) => {
    const handleImageChange: UploadProps["onChange"] = (
      info: UploadChangeParam<UploadFile>
    ) => {
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj as RcFile, (base64Url) => {
          const { name, type } = info.file.originFileObj as RcFile;
          setData((prevData) => {
            const newData = prevData.map((item: DataType) =>
              item.id === record.id
                ? {
                    ...item,
                    image: { ...item.image, name, type, base64Url },
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
        {editing ? (
          record?.image?.base64Url ? (
            <img
              height={200}
              width={200}
              className="p-1 rounded-lg"
              src={record?.image?.base64Url}
              alt="Restaurant Image"
            />
          ) : (
            uploadButton
          )
        ) : (
          <img
            height={200}
            width={200}
            className="p-1 rounded-lg"
            src={record?.image?.base64Url || defaultImageSrc}
            alt="Restaurant Image"
          />
        )}
      </Upload>
    );
  };

  const edit = async (record: Partial<DataType> & { id: string }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}${path}/${record.id}`
      );
      const currentData = response.data.data;

      console.log(form);
      form.setFieldsValue({
        name: "",
        image: record.image,
        ...currentData,
      });
      setEditingKey(record.id);

      return currentData;
    } catch (error) {
      console.error("Error fetching data for editing:", error);
      return null;
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id: string) => {
    try {
      const values = await form.validateFields();
      const currentData = await edit({ id });

      if (!currentData) {
        return;
      }

      const row = {
        displayOrder: currentData.displayOrder,
        id: currentData.id,
        image: values.image,
        restaurantId: restaurantId,
        name: values.name,
      };
      console.log("Row data before PUT request:", row);

      await saveCategoryMutation.mutateAsync(row);
      await refetch();
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = async (idToDelete: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}${path}/${idToDelete}`
      );
      refetch();
      message.success("Item has been deleted!");
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  const columns = [
    {
      key: "sort",
      width: 50,
      align: "center" as const,
    },
    // {
    //   title: "Serial",
    //   dataIndex: "displayOrder",
    //   width: 70,
    // },
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
        return (
          <UploadButtonInput
            isDisabled={isDisabled}
            record={record}
            editing={isEditing(record)}
          />
        );
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
                const values = form.getFieldsValue();
                save(record.id);
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
              onConfirm={() => handleDelete(record.id)}
            >
              <Typography.Link disabled={editingKey !== ""}>
                <button className="bg-red-500 hover:bg-red-600 active:bg-red-500 px-2 py-1 rounded text-white transition">
                  <div className="flex items-center">
                    <MdDelete />
                    Delete
                  </div>
                </button>
              </Typography.Link>
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

  // const onDragEnd = async ({ active, over }: DragEndEvent) => {
  //   const handleDragEnd = async () => {
  //     if (active.id !== over?.id) {
  //       const updatedData = arrayMove(
  //         data,
  //         data.findIndex((item) => item.id === active.id),
  //         data.findIndex((item) => item.id === over?.id)
  //       ).map((item, index) => ({
  //         ...item,
  //         displayOrder: index + 1,
  //       }));
  //       console.log("Updated Data:", updatedData);
  //       await updateDisplayOrder(updatedData);
  //       setData(updatedData);
  //     }
  //   };
  //   handleDragEnd();
  // };

  const tablePagination = {
    total: apiResponse?.totalPages * 10,
    onChange: async (page: number) => {
      setPageParameter(page);
      await refetch();
    },
    pageSize: 10,
  };

  return (
    <div>
      <div className="bg-white font-[500] text-lg p-5 rounded-lg">
        <span className="sm:inline-block hidden">Restaurant</span> Categories
        <Button onClick={handleAdd} type="primary" style={{ float: "right" }}>
          Add Item
        </Button>
      </div>
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        // onDragEnd={onDragEnd}
      >
        <SortableContext
          items={Array.isArray(data) ? data.map((i) => i.id) : []}
          strategy={verticalListSortingStrategy}
        >
          <Form
            key={formKey}
            form={form}
            component={false}
            onFinish={handleOnFinish}
          >
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
              rowKey={(record) => record.id}
              columns={mergedColumns}
              rowClassName={"editable-row"}
              dataSource={dataSource}
              pagination={tablePagination}
            />
          </Form>
        </SortableContext>
      </DndContext>
    </div>
  );
};
