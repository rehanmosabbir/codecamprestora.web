import React, { useId, useState } from 'react';
import type { UploadFile, UploadProps } from 'antd';
import { Button, Checkbox, Form, Input, InputNumber, Popconfirm, Select, Table, Typography } from 'antd';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import Upload, { RcFile, UploadChangeParam } from 'antd/es/upload';
import { DeleteFilled, EditFilled, LoadingOutlined, PlusOutlined, SaveFilled } from '@ant-design/icons';

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
    inputType: 'number' | 'text';
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
    'data-row-key': string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

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

const Row = (props: RowProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: props['data-row-key'],
    });

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        transition,
        cursor: 'move',
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
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
    const [editingKey, setEditingKey] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('');

    const [form] = Form.useForm();

    const cancel = () => {
        setEditingKey('');
    };

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
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
                setEditingKey('');
            } else {
                newData.push(row);
                setDataSource(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
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
            isAvailable: true
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

    const handleImageChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
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

    const uploadButton = (
        <button type="button" className="border rounded-full w-10 h-10">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
        </button>
    );

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

    const UploadButtonInput = () => {
        return (
            <Upload
                name="avatar"
                // listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                onChange={handleImageChange}
            >
                {imageUrl ? <img className="rounded-full w-8 h-8" src={imageUrl} alt="Image" /> : uploadButton}
            </Upload>
        );
    }

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Id',
            dataIndex: 'key',
            editable: false,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            editable: false,
            render: (value, record, rowIndex) => <UploadButtonInput />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            editable: true,
        },
        {
            title: 'Ingredients',
            dataIndex: 'ingredients',
            editable: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            editable: true,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            editable: false,
            render: (value, record, rowIndex) => <SelectInput record={record as Item} />
        },
        {
            title: 'Is Available',
            dataIndex: 'isAvailable',
            editable: false,
            render: (value, record, rowIndex) => <Checkbox checked={value} onChange={() => handleCheckboxChange(record.key)} />
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_: any, record: any /*{ key: React.Key }*/) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            <SaveFilled /> Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <div className="space-x-2">
                        <span>
                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                <EditFilled /> Edit
                            </Typography.Link>
                        </span>
                        <span>
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                                <a><DeleteFilled /> Delete</a>
                            </Popconfirm>
                        </span>
                    </div>
                );
            }
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
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
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
        }),
    );

    const id = useId();

    return (
        <div>
            <Button onClick={handleAdd} type="default" style={{ marginBottom: 16 }}>
                Add a row
            </Button>
            <DndContext id={id} sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
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
                                    row: Row
                                },
                            }}
                            rowClassName='editable-row'
                            bordered
                            dataSource={dataSource}
                            columns={mergedColumns as ColumnTypes}
                            pagination={{
                                onChange: cancel,
                            }}
                        />
                    </SortableContext>
                </Form>
            </DndContext>
        </div >
    );
};
