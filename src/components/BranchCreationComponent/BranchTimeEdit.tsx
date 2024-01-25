import { Table, TimePicker } from "antd";
import { DataType } from "./types/BranchTypes";
import { useBranchDetails } from "./Zustand/Zustand";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";

const BranchTimeEdit = () => {
  const selectionType = "checkbox";
  const {
    mainArrayOfOpeningDetails,
    openingHoursDetails,
    rowSelectedArray,
    updateOpeningHoursDetails,
    updateRowSelectedArray,
  } = useBranchDetails();

  // console.log("Branch Time Edit Page--");

  const rowSelection: any = {
    columnTitle: "Is Open",
    selectedRowKeys: rowSelectedArray,
    onChange: (selectedRowKeys: string[], selectedRows: DataType[]) => {
      updateRowSelectedArray(selectedRowKeys);
      for (let i = 1; i <= 7; i++) {
        const isAble = selectedRowKeys.filter(
          (element) => element === i.toString()
        );
        if (isAble.length === 1)
          updateOpeningHoursDetails(i.toString(), "true", "IsOpen");
        else updateOpeningHoursDetails(i.toString(), "false", "IsOpen");
      }
    },
  };

  type AlignType = "center" | "left" | "right";
  interface ColumnType {
    title: string;
    dataIndex: string;
    align?: AlignType;
    width: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Days",
      dataIndex: "Days",
      align: "center",
      width: "25%",
    },
    {
      title: "Opening Hours",
      dataIndex: "OpeningHours",
      align: "center",
      width: "25%",

      render: (record: ColumnType, index: any) => (
        <TimePicker
          defaultValue={dayjs(
            openingHoursDetails[index?.key - ("1" as any)]?.OpeningHours,
            "h:mm A"
          )}
          use12Hours
          format="h:mm A"
          onChange={(value: any, dateString: string) =>
            updateOpeningHoursDetails(index?.key, dateString, "OpeningHours")
          }
        />
      ),
    },
    {
      title: "Closing Hours",
      dataIndex: "ClosingHours",
      align: "center",
      width: "25%",
      render: (record: ColumnType, index: any) => (
        <TimePicker
          defaultValue={dayjs(
            openingHoursDetails[index?.key - ("1" as any)]?.ClosingHours,
            "h:mm A"
          )}
          use12Hours
          format="h:mm A"
          onChange={(value: any, dateString: string) =>
            updateOpeningHoursDetails(index?.key, dateString, "ClosingHours")
          }
        />
      ),
    },
    Table.SELECTION_COLUMN,
  ];
  // console.log("rows select====>>> ", rowSelection);
  return (
    <div>
      <Table
        scroll={{ x: 400 }}
        dataSource={mainArrayOfOpeningDetails}
        columns={columns}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  );
};

export default BranchTimeEdit;
