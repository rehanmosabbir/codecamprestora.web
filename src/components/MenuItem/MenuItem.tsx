import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useId, useState } from "react";
import { Button, Checkbox, Form, Popconfirm, Select, Space, Table, Typography } from "antd";
import { IMenuItem, IMenuItemProps } from "@/types/menu-item";
import { dummyData, dummyNewData } from "./dummyData";
import { EditableCell, Row } from "./components";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export function MenuItem({ data: { menuCategory, menuItem } }: { data: IMenuItemProps }) {
    const [dataSource, setDataSource] = useState<IMenuItem[]>(dummyData);
    const [editingKey, setEditingKey] = useState<string>("");
    const [form] = Form.useForm();

    const isEditing = (record: IMenuItem) => record.id === editingKey;

    const edit = (record: IMenuItem) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.id);
    }

    const cancel = () => {
        setEditingKey("");
    }

    const save = async (id: string) => {
        try {
            const row = (await form.validateFields()) as IMenuItem;
            const newData = [...dataSource];
            const index = newData.findIndex((item) => id === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                setDataSource(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setDataSource(newData);
                setEditingKey("");
            }

            console.log(`save: ${id}`);
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

    const handleAdd = () => {
        const newData: IMenuItem = dummyNewData;
        setDataSource([...dataSource, newData]);
    }

    const handleDelete = (id: string) => {
        console.log(`Delete Id: ${id}`);
    }

    const handleChange = (id: string) => {
        setDataSource((previousData) => {
            const newData = previousData.map((item) =>
                item.id === id ? { ...item, availability: !item.availability } : item
            )
            return newData;
        })
    }

    const columns: any = [
        {
            key: "sort",
        },
        {
            title: "Order",
            dataIndex: "displayOrder",
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
            title: "Price",
            dataIndex: "price",
            editable: true
        },
        {
            title: "Category",
            dataIndex: "categoryId",
            render: (_: any) => {
                return (
                    <Select disabled={editingKey === ""} style={{ width: "120px" }} size="large">
                        {
                            menuCategory.data.map(category =>
                                <Select.Option key={category.id}>
                                    {category.name}
                                </Select.Option>
                            )
                        }
                    </Select>
                )
            }
        },
        {
            title: "Availability",
            dataIndex: "availability",
            render: (_: any, record: IMenuItem) => {
                const editable = isEditing(record);
                return editable ? (
                    <Checkbox
                        checked={record.availability}
                        onChange={() => handleChange(record.id)}
                    />
                ) : record.availability ?
                    <CheckOutlined
                        style={{ fontSize: "x-large", color: "green" }}
                    /> :
                    <CloseOutlined
                        style={{ fontSize: "x-large", color: "red" }}
                    />
            }
        },
        {
            title: "Operation",
            render: (_: any, record: IMenuItem) => {
                const editable = isEditing(record);

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
        },
    ];

    const mergedColumns = columns.map((col: any) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: IMenuItem) => ({
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
            setDataSource((previous) => {
                const activeIndex = previous.findIndex((i) => i.id === active.id);
                const overIndex = previous.findIndex((i) => i.id === over?.id);
                return arrayMove(previous, activeIndex, overIndex);
            });
        }
    };

    const id = useId();

    return (
        <DndContext id={id} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
            <SortableContext
                items={dataSource.map((i) => i.id)}
                strategy={verticalListSortingStrategy}
            >
                <Form form={form} component={false}>
                    <Button
                        type="primary"
                        style={{ marginBottom: 16, float: "right" }}
                        onClick={handleAdd}
                    >
                        Add Menu Item
                    </Button>
                    <Table
                        columns={mergedColumns}
                        components={{
                            body: {
                                cell: EditableCell,
                                row: Row,
                            },
                        }}
                        dataSource={dataSource}
                        rowClassName={() => "editable-row"}
                        rowKey="id"
                        size="large"
                    />
                </Form>
            </SortableContext>
        </DndContext>
    );
};
