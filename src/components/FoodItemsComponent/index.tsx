import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useId, useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Popconfirm, Select, Table, Typography, Upload } from 'antd';
import { DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons';

interface DataType {
    key: string;
    image: any;
    name: string;
    description: string;
    ingredients: string;
    price: string;
    category: string[];
    isAvailable: boolean;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
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
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

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

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
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
        id: props['data-row-key'],
    });

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        transition,
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

export const FoodItemsComponent: React.FC = () => {
    const [count, setCount] = useState<number>(1);
    const [dataSource, setDataSource] = useState<any>([]);
    const [editingKey, setEditingKey] = useState<string>('0');
    const [form] = Form.useForm<any>();

    const isEditing = (record: DataType) => record.key === editingKey;

    const edit = (record: Partial<DataType> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('0');
    }

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
                setEditingKey('0');
            } else {
                newData.push(row);
                setDataSource(newData);
                setEditingKey('0');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleAdd = () => {
        const newData: DataType = {
            key: count.toString(),
            image: 'Image',
            name: 'Name',
            description: 'Description',
            ingredients: 'Ingredients',
            price: 'Price',
            category: ['xyz1', 'xyz2'],
            isAvailable: false
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item: any) => item.key !== key);
        setDataSource(newData);
    };

    const handleCheckboxChange = (rowIndex: any, columnKey: any) => (event: any) => {
        const newDataSource: any = [...dataSource];
        newDataSource[rowIndex][columnKey] = event.target.checked;
        setDataSource(newDataSource);
    }

    const uploadButton = (
        <span>
            <FileAddTwoTone className="mr-2" />
            Add Image
        </span>
    );

    const ImageUpload = () => {
        return (
            <Upload
                fileList={undefined}
            >
                {uploadButton}
            </Upload>
        );
    };

    const SelectInput = ({ value }: any) => {
        return (
            <Select style={{ width: '100%' }} defaultValue={"Add Category"}>
                {
                    value.map((item: any) => <Select.Option key={item} value={item}>{item}</Select.Option>)
                }
            </Select>
        );
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: () => <ImageUpload />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            editable: true
        },
        {
            title: 'Description',
            dataIndex: 'description',
            editable: true
        },
        {
            title: 'Ingredients',
            dataIndex: 'ingredients',
            editable: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            editable: true
        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: (value: any, record: any, rowIndex: any) => <SelectInput value={value} />
        },
        {
            title: 'Is Available',
            dataIndex: 'isAvailable',
            render: (value: boolean, record: any, rowIndex: any) => <Checkbox checked={value} onChange={handleCheckboxChange(rowIndex, 'isAvailable')} />
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_: any, record: DataType) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <div className="space-x-4">
                        <Typography.Link disabled={editingKey !== '0'} onClick={() => edit(record)}>
                            <EditTwoTone /> Edit
                        </Typography.Link>
                        <Popconfirm title={"Sure to Delete?"} onConfirm={() => handleDelete(record.key)}>
                            <a><DeleteTwoTone /> Delete</a>
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
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setDataSource((previous: any) => {
                const activeIndex = previous.findIndex((i: any) => i.key === active.id);
                const overIndex = previous.findIndex((i: any) => i.key === over?.id);
                return arrayMove(previous, activeIndex, overIndex);
            });
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
                distance: 1,
            },
        }),
    );

    const id = useId();

    return (
        <div className="">
            <Button onClick={handleAdd} type="primary" style={{ float: "right", margin: "16px" }}>
                Add Item
            </Button>
            <DndContext id={id} sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                    // rowKey array
                    items={dataSource.map((i: any) => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <Form form={form} component={false}>
                        <Table
                            components={{
                                body: {
                                    row: Row,
                                    cell: EditableCell
                                },
                            }}
                            bordered
                            rowKey="key"
                            columns={mergedColumns}
                            dataSource={dataSource}
                            rowClassName={"editable-row"}
                            pagination={{
                                onChange: cancel
                            }}
                        />
                    </Form>
                </SortableContext>
            </DndContext>
        </div>
    );
};
