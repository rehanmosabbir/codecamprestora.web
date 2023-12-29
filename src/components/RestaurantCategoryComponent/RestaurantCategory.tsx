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
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Typography,
  Upload,
} from "antd";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { TbPencilCancel } from "react-icons/tb";
import type { ColumnsType } from "antd/es/table";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";

interface DataType {
  key: string;
  name: string;
  picture: any;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: DataType;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

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
    ...(isDragging ? { position: "relative" } : {}),
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

export const RestaurantCategories: React.FC = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", picture: "", ...record });
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
      name: "Add Restaurant Name",
      picture: "",
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

  const App: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps["onChange"] = (
      info: UploadChangeParam<UploadFile>
    ) => {
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as RcFile, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      }
    };

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{ width: "90%", borderRadius: "5%" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </>
    );
  };

  // : ColumnsType<DataType>
  const columns = [
    {
      title: "ID",
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
      dataIndex: "picture",
      render: () => <App />,
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
        Restaurant Categories
        <Button
          onClick={handleAdd}
          type="primary"
          className=""
          style={{ float: "right" }}
        >
          Add Item
        </Button>
      </div>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          // rowKey array
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
