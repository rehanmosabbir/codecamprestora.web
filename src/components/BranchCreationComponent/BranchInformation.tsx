import React, { useState } from "react";
import { BranchInfoEdit } from "./BranchInfoEdit";
import { Button, Card, Divider, Table } from "antd";
import Meta from "antd/es/card/Meta";
import { ColumnsType } from "antd/es/table";
import { DataType } from "./types/BranchTypes";

const columns: ColumnsType<DataType> = [
  {
    title: "Days",
    dataIndex: "Days",
    align: "center",
  },
  {
    title: "Opening Hours",
    dataIndex: "OpeningHours",
    align: "center",
  },
  {
    title: "Closing Hours",
    dataIndex: "ClosingHours",
    align: "center",
  },
];

const data: DataType[] = [
  {
    key: "1",
    Days: "Saturday",
    OpeningHours: "10 AM",
    ClosingHours: "10 PM",
  },
  {
    key: "2",
    Days: "Sunday",
    OpeningHours: "10 AM",
    ClosingHours: "10 PM",
  },
  {
    key: "3",
    Days: "Monday",
    OpeningHours: "10 AM",
    ClosingHours: "10 PM",
  },
  {
    key: "4",
    Days: "Tuesday",
    OpeningHours: "10 AM",
    ClosingHours: "10 PM",
  },
  {
    key: "5",
    Days: "Wednesday",
    OpeningHours: "10 AM",
    ClosingHours: "10 PM",
  },
  {
    key: "6",
    Days: "Thursday",
    OpeningHours: "10 AM",
    ClosingHours: "10 PM",
  },
  {
    key: "7",
    Days: "Friday",
    OpeningHours: "10 AM",
    ClosingHours: "10 PM",
  },
];

export const BranchInfo = () => {
  const [editInfo, setEditInfo] = useState(true);

  return editInfo ? (
    <div className=" bg-slate-100 rounded-lg flex justify-center min-h-[calc(100vh-130px)]">
      <div className="flex justify-center items-center">
        <div className="w-full m-10">
          <Card
            title="Branch Information"
            extra={
              <div>
                <Button
                  onClick={() => setEditInfo(false)}
                  className="bg-purple-700 font-medium hover:bg-purple-600 text-white"
                  type="primary"
                >
                  Edit
                </Button>
              </div>
            }
            style={{ width: 900 }}
          >
            <div className="grid gap-3 col-span-4">
              <label>Branch Name:</label>
              <label>Contact Number:</label>
              <label>Branch Address:</label>
              <div>
                <Meta title="Opening Hours" />
                <Divider />
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ hideOnSinglePage: true }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-slate-100 rounded-lg flex justify-center items-center">
      <div>
        <div className="w-full m-11">
          <BranchInfoEdit editInfoOff={setEditInfo} />
        </div>
      </div>
    </div>
  );
};
export default BranchInfo;
