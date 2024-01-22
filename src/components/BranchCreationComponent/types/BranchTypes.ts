import React from "react";

export interface DataType {
  key: string;
  day: number| string;
  openingHours: string;
  closingHours: string;
  isClosed: any;
  enabled: boolean;
}

// export interface Item {
//   key: string;
//   Days: string;
//   OpeningHours: string;
//   ClosingHours: string;
//   enabled:boolean
// }

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: DataType;
  index: number;
  children: React.ReactNode;
}
