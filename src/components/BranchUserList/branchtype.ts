export interface DataType {
  key: string;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface EditableCellProps {
  editing: boolean;
  dataIndex: keyof DataType;
  title: any;
  inputType: "number" | "text" | "select";
  record: DataType;
  index: number;
  children: React.ReactNode;
  handleSelectChange: (
    name: keyof DataType,
    value: string,
    record: DataType
  ) => void;
}
export interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}
