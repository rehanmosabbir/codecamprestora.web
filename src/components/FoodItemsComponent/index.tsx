import React, { useId, useState } from "react";
import type { UploadFile, UploadProps } from "antd";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
  Typography,
} from "antd";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import Upload, { RcFile, UploadChangeParam } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
import { IoMdSave } from "react-icons/io";
import { TbPencilCancel } from "react-icons/tb";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

interface DataType {
  key: React.Key;
  image: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  category: string[];
  isAvailable: boolean;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

interface Item {
  key: string;
  image: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  category: string[];
  isAvailable: boolean;
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

type EditableTableProps = Parameters<typeof Table>[0];

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
    cursor: "move",
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

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export function FoodItemsComponent() {
  const [count, setCount] = useState<number>(1);
  const [dataSource, setDataSource] = useState<DataType[]>([
    // {
    //     key: '1',
    //     image: "image 1",
    //     name: "name 1",
    //     description: "description 1",
    //     ingredients: "ingredients 1",
    //     price: 123,
    //     category: ["cat1", "cat2"],
    //     isAvailable: true,
    // },
    // {
    //     key: '2',
    //     image: "image 2",
    //     name: "name 2",
    //     description: "description 2",
    //     ingredients: "ingredients 2",
    //     price: 123,
    //     category: ["cat1", "cat2"],
    //     isAvailable: true,
    // },
    // {
    //     key: '3',
    //     image: "image 3",
    //     name: "name 3",
    //     description: "description 3",
    //     ingredients: "ingredients 3",
    //     price: 123,
    //     category: ["cat1", "cat2"],
    //     isAvailable: false,
    // }
  ]);
  const [editingKey, setEditingKey] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const [form] = Form.useForm();

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const isEditing = (record: Item) => record.key === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

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

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      image: "image",
      name: "name",
      description: "description",
      ingredients: "ingredients",
      price: 123,
      category: ["cat1", "cat2"],
      isAvailable: true,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleCheckboxChange = (key: React.Key) => {
    setDataSource((prevDataSource) => {
      const newData = prevDataSource.map((item) =>
        item.key === key ? { ...item, isAvailable: !item.isAvailable } : item
      );
      return newData;
    });
  };

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
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

  const SelectInput: React.FC<{ record: Item }> = ({ record }) => {
    const handleSelectChange = (selectedValues: string[]) => {
      setDataSource((prevDataSource) => {
        const newData = prevDataSource.map((item) =>
          item.key === record.key ? { ...item, category: selectedValues } : item
        );
        return newData;
      });
    };

    return (
      <Select value={record.category} onChange={handleSelectChange}>
        <Select.Option value="cat1">Category 1</Select.Option>
        <Select.Option value="cat2">Category 2</Select.Option>
      </Select>
    );
  };

  const UploadButtonInput = ({ record }: any) => {
    const handleImageChange: UploadProps["onChange"] = (
      info: UploadChangeParam<UploadFile>
    ) => {
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj as RcFile, (url) => {
          // Update only the image URL for the specific record
          setDataSource((prevDataSource) => {
            const newData = prevDataSource.map((item) =>
              item.key === record.key ? { ...item, image: url } : item
            );
            return newData;
          });
        });
      }
    };

    console.log(record.image);

    return (
      <Upload
        name="avatar"
        className="avatar-uploader"
        showUploadList={false}
        onChange={handleImageChange}
      >
        {record.image !== "image" ? (
          <img className="rounded-full w-8 h-8" src={record.image} alt="" />
        ) : (
          <button type="button" className="border rounded-lg px-2 py-1">
            <UploadOutlined /> Upload
          </button>
        )}
      </Upload>
    );
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Serial",
      dataIndex: "key",
      editable: false,
    },
    {
      title: "Image",
      dataIndex: "image",
      width: "10%",
      editable: false,
      render: (value, record, rowIndex) => (
        <UploadButtonInput record={record} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "Ingredients",
      dataIndex: "ingredients",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      editable: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      editable: false,
      render: (value, record, rowIndex) => {
        const editable = isEditing(record as Item);
        return editable ? (
          <SelectInput record={record as Item} />
        ) : (
          record.category
        );
      },
    },
    {
      title: "Is Available",
      dataIndex: "isAvailable",
      editable: false,
      render: (value, record, rowIndex) => {
        const editable = isEditing(record as Item);
        return editable ? (
          <Checkbox
            checked={value}
            onChange={() => handleCheckboxChange(record.key)}
          />
        ) : value ? (
          "Yes"
        ) : (
          "No"
        );
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: "20%",
      render: (_: any, record: any /*{ key: React.Key }*/) => {
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
            <span>
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
            </span>
            <span>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.key)}
              >
                <button className="bg-red-500 hover:bg-red-500 active:bg-red-500 px-2 py-1 rounded text-white transition">
                  <div className="flex items-center">
                    <MdDelete />
                    Delete
                  </div>
                </button>
              </Popconfirm>
            </span>
          </div>
        );
      },
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "price" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    })
  );

  const id = useId();

  return (
    <div>
      <div className="bg-white font-[500] text-lg p-5 rounded-lg">
        List of Food Items
        <Button onClick={handleAdd} type="primary" style={{ float: "right" }}>
          Add Item
        </Button>
      </div>
      <DndContext
        id={id}
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
      >
        <Form form={form} component={false}>
          <SortableContext
            // rowKey array
            items={dataSource.map((i) => i.key) as any}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={{
                body: {
                  cell: EditableCell,
                  row: Row,
                },
              }}
              scroll={{ x: 1000 }}
              bordered
              rowClassName="editable-row"
              dataSource={dataSource}
              columns={mergedColumns as ColumnTypes}
              pagination={{
                onChange: cancel,
              }}
            />
          </SortableContext>
        </Form>
      </DndContext>
    </div>
  );
}
