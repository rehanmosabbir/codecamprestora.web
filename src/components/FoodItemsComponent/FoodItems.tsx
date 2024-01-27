import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { Button, Checkbox, Form, Input, InputNumber, Popconfirm, Select, Space, Spin, Table, Typography } from "antd";
import { CSSProperties, Children, ReactElement, ReactNode, cloneElement, useId, useState } from "react";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { MenuOutlined } from "@ant-design/icons";

interface ImageType {
  name: string;
  type: string;
  base64: string;
}

export interface DataType {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  availability: boolean;
  image: ImageType;
  displayOrder: number;
  categoryId: string;
  branchId: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  dataIndex: string;
  editing: boolean;
  index: number;
  inputType: "number" | "text";
  record: DataType;
  title: any;
}

export interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const tempData: DataType[] = [
    {
        id: "id1",
        name: "name1",
        description: "description1",
        ingredients: "ingredients1",
        price: 101,
        availability: true,
        image: {
            name: "name1",
            type: "type1",
            base64: "base641"
        },
        displayOrder: 1,
        categoryId: "categoryId1",
        branchId: "branchId1"
    },
    {
        id: "id2",
        name: "name2",
        description: "description2",
        ingredients: "ingredients2",
        price: 102,
        availability: false,
        image: {
            name: "name2",
            type: "type2",
            base64: "base642"
        },
        displayOrder: 2,
        categoryId: "categoryId2",
        branchId: "branchId2"
    }
]

export function FoodItemsComponent() {
    const id = useId();
    const [data, setData] = useState<DataType[]>(tempData);
    const [editingKey, setEditingKey] = useState<string>("");
    const [form] = Form.useForm();
    
    const isEditing = (record: DataType) => record.id === editingKey;

    const edit = (record: Partial<DataType> & { id: string }) => {
        form.setFieldsValue({
            name: "", description: "", ingredients: "", price: 0, availability: false, displayOrder: 1, ...record
        });
        setEditingKey(record.id);
    }

    const cancel = () => {
        setEditingKey("");
    }

    const save = async (id: string) => {
        try {
            const row = (await form.validateFields()) as DataType;
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }

            console.log(`save: ${id}`);
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

    const handleAdd = () => {
        const newData: DataType = {
            id: "id",
            name: "name",
            description: "description",
            ingredients: "ingredients",
            price: 0,
            availability: true,
            image: { name: "name", type: "type", base64: "base64" },
            displayOrder: 1,
            categoryId: "categoryId",
            branchId: "branchId"
        }
        setData([...data, newData]);
    }

    const handleDelete = (id: string) => {
        console.log(`Delete Id: ${id}`);
    }

    const handleCheckbox = (id: string) => {
        setData((previousData) => {
            const newData = previousData.map((item) =>
                item.id === id ? { ...item, availability: !item.availability } : item
            )
            return newData;
        })
    }

    const EditableCell: React.FC<EditableCellProps> = ({
        children,
        dataIndex,
        editing,
        index,
        inputType,
        record,
        title,
        ...restProps
    }) => {
        const inputNode = inputType === "number" ? <InputNumber min={0} size="large" placeholder={`${title}`} /> : <Input size="large" placeholder={`${title}`} />

        return (
            <td {...restProps}>
                {
                    editing ? (
                        <Form.Item
                            name={dataIndex}
                            style={{ margin: 0 }}
                            rules={[
                                {
                                    required: true,
                                    message: `Please Input ${title}!`
                                }
                            ]}
                        >
                            {inputNode}
                        </Form.Item>
                    ) : (
                        children
                    )
                }
            </td>
        )
    }

    const Row = ({ children, ...props }: RowProps) => {
        const {
            attributes,
            isDragging,
            listeners,
            setActivatorNodeRef,
            setNodeRef,
            transform,
            transition
        } = useSortable({
            id: props["data-row-key"]
        });

        const style: CSSProperties = {
            ...props.style,
            transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
            transition,
            ...(isDragging ? { position: "relative", zIndex: 9999 } : {})
        }

        return (
            <tr style={style} ref={setNodeRef} {...attributes} {...props}>
                {
                    Children.map(children, (child) => {
                        if ((child as ReactElement).key === "sort") {
                            return cloneElement(child as ReactElement, {
                                children: (
                                    <MenuOutlined
                                        style={{ cursor: "move", touchAction: "none" }}
                                        ref={setActivatorNodeRef}
                                        {...listeners}
                                    />
                                )
                            });
                        }
                        return child;
                    })
                }
            </tr>
        )
    }

    const columns = [
        {
            key: "sort"
        },
        {
            title: "Order",
            dataIndex: "displayOrder"
        },
        {
            title: "Image",
            dataIndex: "image"
        },
        {
            title: "Name",
            dataIndex: "name",
            editable: true
        },
        {
            title: "Description",
            dataIndex: "description",
            editable: true
        },
        {
            title: "Ingredients",
            dataIndex: "ingredients",
            editable: true
        },
        {
            title: "Categories",
            dataIndex: "categoryId",
            render: (_: any, record: DataType) => {
                const editable = isEditing(record);
                return true ?
                    <Select defaultValue={`Choose Item`} disabled={!editable} size="large">
                        <Select.Option key="key1" value="value1">Item 1</Select.Option>
                        <Select.Option key="key2" value="value2">Item 2</Select.Option>
                        <Select.Option key="key3" value="value3">Item 3</Select.Option>
                    </Select>
                    : {};
            }
        },
        {
            title: "Price",
            dataIndex: "price",
            editable: true
        },
        {
            title: "Availability",
            dataIndex: "availability",
            render: (_: any, record: DataType) => {
                const editable = isEditing(record);
                return editable ? (
                    <Checkbox
                        checked={record.availability}
                        onChange={() => handleCheckbox(record.id)}
                    />
                ) : record.availability ? <p>Yes</p> : <p>No</p>
            }
        },
        {
            title: "Operation",
            render: (_: any, record: DataType) => {
                const editable = isEditing(record)
                return (
                    editable ? (
                        <span>
                            <Typography.Link style={{ marginRight: 8 }} onClick={() => save(record.id)}>
                                Save
                            </Typography.Link>
                            <Popconfirm title="Sure to Cancel?" onConfirm={cancel}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                        <Space size="middle">
                            <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
                                Edit
                            </Typography.Link>
                            <Popconfirm title="Sure to Delete?" onConfirm={() => handleDelete(record.id)}>
                                <Typography.Link disabled={editingKey !== ""}>
                                    Delete
                                </Typography.Link>
                            </Popconfirm>
                        </Space>
                    )
                )
            }
        }
    ]

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                dataIndex: col.dataIndex,
                editing: isEditing(record),
                inputType: col.dataIndex === "price" ? "number" : "text",
                record,
                title: col.title,
            })
        }
    })

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setData((previous) => {
                const activeIndex = previous.findIndex((i) => i.id === active.id);
                const overIndex = previous.findIndex((i) => i.id === over?.id);
                return arrayMove(previous, activeIndex, overIndex);
            });
        }
    }

    return (
        <div>
            <Button type="primary" style={{ marginBottom: 16 }} onClick={handleAdd}>Add Menu Item</Button>
            <Form form={form} component={false}>
                <DndContext id={id} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                    <SortableContext
                        items={data.map((i) => i.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <Table
                            dataSource={data}
                            columns={mergedColumns}
                            components={{
                                body: {
                                    cell: EditableCell,
                                    row: Row
                                }
                            }}
                            rowClassName={() => "editable-row"}
                            rowKey="id"
                        />
                    </SortableContext>
                </DndContext>
            </Form>
        </div>
    );
}