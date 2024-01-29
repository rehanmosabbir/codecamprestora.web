export interface DataType {
    id: string;
    name: string;
    image: ImageObject;
    displayOrder: number;
    restaurantId?: string;
}

export interface ImageObject {
    name: string;
    type: string;
    base64: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: "number" | "text";
    record: DataType;
    index: number;
    children: React.ReactNode;
}

export interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
}