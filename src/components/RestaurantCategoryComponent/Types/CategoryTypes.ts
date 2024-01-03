export interface DataType {
    key: string;
    name: string;
    image: any;
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
    "data-row-key": string;
}