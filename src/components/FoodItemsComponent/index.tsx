import React, { useId, useState } from 'react';
import type { UploadFile, UploadProps } from 'antd';
import { Button, Checkbox, Form, Input, InputNumber, Popconfirm, Select, Table, Typography } from 'antd';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import Upload, { RcFile, UploadChangeParam } from 'antd/es/upload';
import { CheckCircleOutlined, CheckCircleTwoTone, CheckOutlined, CloseCircleOutlined, CloseCircleTwoTone, CloseOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { IoMdSave } from 'react-icons/io';
import { TbPencilCancel } from 'react-icons/tb';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import { ColumnsType } from 'antd/es/table';

interface ImageObject {
    name: string;
    type: string;
    size: number;
}

interface DataType {
    key: React.Key;
    image: ImageObject;
    name: string;
    description: string;
    ingredients: string;
    price: number;
    category: string[];
    available: boolean;
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
    image: ImageObject;
    name: string;
    description: string;
    ingredients: string;
    price: number;
    category: string[];
    available: boolean;
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
    const inputNode = inputType === 'number' ? <InputNumber min={0} size="large" placeholder={`${title}`} /> : <Input size="large" placeholder={`${title}`} />;

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

const Row = ({ children, ...props }: RowProps) => {
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
        id: props['data-row-key'],
    });

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        transition,
        ...(isDragging ? { position: 'relative' } : {}),
    };

    return (
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
            {React.Children.map(children, (child) => {
                if ((child as React.ReactElement).key === 'sort') {
                    return React.cloneElement(child as React.ReactElement, {
                        children: (
                            <MenuOutlined
                                ref={setActivatorNodeRef}
                                style={{ touchAction: 'none', cursor: 'move' }}
                                {...listeners}
                            />
                        ),
                    });
                }
                return child;
            })}
        </tr>
    );
};

const getBase64 = (img: RcFile, callback: (base64Url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

export function FoodItemsComponent() {
    const [count, setCount] = useState<number>(1);
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [editingKey, setEditingKey] = useState<string>('');

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
            console.log(newData);
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleAdd = () => {
        const newData: DataType = {
            key: count,
            image: { name: '', type: '', size: 0 },
            name: '',
            description: '',
            ingredients: '',
            price: 0,
            category: ['Starters', 'Main Course', 'Side Dishes', 'Desert'],
            available: false
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleCheckboxChange = (key: React.Key) => {
        setDataSource((prevDataSource) => {
            const newData = prevDataSource.map((item) =>
                item.key === key ? { ...item, available: !item.available } : item
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

    const SelectInput: React.FC<{ isDisabled: boolean, record: Item }> = ({ isDisabled, record }) => {
        const handleSelectChange = (selectedValues: string[]) => {
            setDataSource((prevDataSource) => {
                const newData = prevDataSource.map((item) =>
                    item.key === record.key ? { ...item, category: selectedValues } : item
                );
                return newData;
            });
        };

        return (
            <Select
                disabled={!isDisabled}
                value={record.category}
                options={[
                    { value: 'starters', label: 'Starters' },
                    { value: 'mainCourse', label: 'Main Course' },
                    { value: 'sideDishes', label: 'Side Dishes' },
                    { value: 'desert', label: 'Desert' }
                ]}
                onChange={handleSelectChange}
                size="large"
            />
        );
    };

    const uploadButton = (
        <div className="text-gray-400 text-center">
            <PlusOutlined />
            <p>Upload</p>
        </div>
    )

    const UploadButtonInput = ({ isDisabled, record }: any) => {
        const handleImageChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
            if (info.file.status === 'done') {
                getBase64(info.file.originFileObj as RcFile, (base64Url) => {
                    const { name, type, size } = info.file.originFileObj as RcFile;
                    setDataSource((prevDataSource) => {
                        const newData = prevDataSource.map((item) =>
                            item.key === record.key ? { ...item, image: { ...item.image, name, type, size, base64Url } } : item
                        );
                        return newData;
                    });
                });
            }
        };

        return (
            <Upload
                name="avatar"
                className="avatar-uploader"
                listType="picture-card"
                showUploadList={false}
                onChange={handleImageChange}
                disabled={!isDisabled}
            >
                {
                    record.image.base64Url ? <img src={record.image.base64Url} alt="Image" /> : uploadButton
                }
            </Upload>
        );
    };

    const defaultColumns: any = [
        {
            key: 'sort',
            align: "center" as const,
        },
        {
            title: 'Serial',
            dataIndex: 'key',
            editable: false,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            editable: false,
            render: (value: any, record: any, rowIndex: any) => {
                const isDisabled = isEditing(record as Item);
                return <UploadButtonInput isDisabled={isDisabled} value={value} record={record} />
            }
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
            render: (value: any, record: any, rowIndex: any) => {
                const isDisabled = isEditing(record as Item);
                return <SelectInput isDisabled={isDisabled} record={record as Item} />
            }
        },
        {
            title: 'Available',
            dataIndex: 'available',
            editable: false,
            render: (value: any, record: any, rowIndex: any) => {
                const editable = isEditing(record as Item);
                return editable ?
                    <Checkbox
                        checked={value}
                        onChange={() => handleCheckboxChange(record.key)}
                    /> : value ?
                        <CheckOutlined style={{ fontSize: "120%" }} /> : <CloseOutlined style={{ fontSize: "120%" }} />
            }
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            width: '175px',
            render: (_: any, record: any /*{ key: React.Key }*/) => {
                const editable = isEditing(record);
                return editable ? (
                    <div className="flex justify-center items-center ">
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
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
                    </div>
                ) : (
                    <div className="flex justify-center items-center gap-2">
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <button className="bg-sky-600 hover:bg-sky-700 active:bg-sky-600 px-2 py-1 rounded text-white transition">
                                <div className="flex items-center">
                                    <RiEdit2Fill />
                                    Edit
                                </div>
                            </button>
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <button className="bg-red-500 hover:bg-red-500 active:bg-red-500 px-2 py-1 rounded text-white transition">
                                <div className="flex items-center">
                                    <MdDelete />
                                    Delete
                                </div>
                            </button>
                        </Popconfirm>
                    </div>
                );
            }
        },
    ];

    const columns = defaultColumns.map((col: any) => {
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

    const mergedColumns = columns.map((col: any) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'price' ? 'number' : 'text',
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

    const id = useId();

    return (
        <div>
            <div className="bg-white font-[500] text-lg p-5 rounded-lg">
                List of Food Items
                <Button onClick={handleAdd} type="primary" style={{ float: "right" }}>
                    Add Item
                </Button>
            </div>
            <Form form={form} component={false}>
                <DndContext id={id} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                    <SortableContext
                        items={dataSource.map((i) => i.key) as any}
                        strategy={verticalListSortingStrategy}
                    >
                        <Table
                            bordered
                            columns={mergedColumns as ColumnTypes}
                            components={{
                                body: {
                                    cell: EditableCell,
                                    row: Row
                                },
                            }}
                            dataSource={dataSource}
                            pagination={{
                                onChange: cancel,
                            }}
                            rowClassName='editable-row'
                            rowKey="key"
                            scroll={{ x: 1150 }}
                            style={{ position: "relative", zIndex: "0" }}
                        />
                    </SortableContext>
                </DndContext>
            </Form>
        </div >
    );
};
