import { IEditableCellProps, IRowProps } from "@/types/menu-item";
import { MenuOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { Form, Input, InputNumber } from "antd";
import React from "react";

export const EditableCell: React.FC<IEditableCellProps> = ({
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

export const Row = ({ children, ...props }: IRowProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
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

    return (
        <tr style={style} ref={setNodeRef} {...props} {...attributes}>
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
