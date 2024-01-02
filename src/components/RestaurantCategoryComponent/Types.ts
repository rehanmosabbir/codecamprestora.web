interface DataType {
    key: string;
    name: string;
    image: {};
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: "number" | "text";
    record: DataType;
    index: number;
    children: React.ReactNode;
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    "data-row-key": string;
}