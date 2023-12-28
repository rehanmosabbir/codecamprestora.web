export interface DataType {
  key: React.Key;
  Days: string;
  OpeningHours: string;
  ClosingHours: string;
}

export interface Item {
  key: string;
  Days: string;
  OpeningHours: string;
  ClosingHours: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}