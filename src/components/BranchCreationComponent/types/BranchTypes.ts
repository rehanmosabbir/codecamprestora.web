import React from "react";

export interface DataType {
  key: string;
  Days: string;
  OpeningHours: string;
  ClosingHours: string;
  IsOpen: string;
  // enabled: boolean;
}

export interface openingClosingType {
 
  day: number;
  openingHours: string;
  closingHours: string;
  isClosed: any;
 
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: DataType;
  index: number;
  children: React.ReactNode;
}
