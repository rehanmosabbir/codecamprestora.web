import React, { ChangeEvent, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { DataType, EditableCellProps, Item } from "./types/BranchTypes";
import {  ColumnsType } from "antd/es/table";
import { AiTwotoneCheckCircle } from "react-icons/ai";


const rowSelection = {
  columnTitle:'Is Open',
  onChange: (selectedRowKeys: React.Key[], selectedRows: Item[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  
  // getCheckboxProps: (record: DataType) => ({
  //   // disabled: record.Days === "Disabled User", // Column configuration not to be checked
  //   name: record.Days,
  // }),
};

const originData: Item[] = [
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

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )} 
    </td>
  );
};

const BranchTimeEdit = () => {
  const selectionType = "checkbox";
  const [form] = Form.useForm();
  console.log({form});
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      Days: "",
      OpeningHours: "",
      ClosingHours: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log({ newData });

        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  type AlignType = 'center' | 'left' | 'right';

  interface ColumnType {
    title: string,
    dataIndex: string,
    align?: AlignType,
    width: string,
    editable?: boolean,
    render?: (_: any, record: Item) => React.JSX.Element
  }

  const columns: any  = [
    {
      title: "Days",
      dataIndex: "Days",
      align: "center",
      width: "25%"
      // editable: true,
    },
    {
      title: "Opening Hours",
      dataIndex: "OpeningHours",
      align: 'center',
      width: "25%",
      render: (record : Item) =><Input type="text"/>
      // editable: true,
    },
    {
      title: "Closing Hours",
      dataIndex: "ClosingHours",
      align: "center",
      width: "25%",
      editable: true,
      render: (record : Item) =><Input type="text"/>
      // onCell: 'mehedi'
    },
    // {
    //   title: "Status",
    //   dataIndex: "Status",
    //   align: "center",
    //   width: "25%",
    
    //   render: (record : Item) =><button className="bg-green-500 hover:bg-green-400 active:bg-green-500 px-2 py-1 rounded text-white transition">
    //   <div className="flex items-center">
    //     Enable
    //   </div>
    // </button>
    // }
    // {
    //   width: "25%",
    //   title: "Operation",
    //   dataIndex: "operation",
    //   align: "center",
    //   render: (record : Item) =><Input type="text"/>
     
      // render: (_: any, record: Item) => {
        // const editable = isEditing(record);
        // return editable ? (
        //   <span>
        //     <Typography.Link
        //       onClick={() => save(record.key)}
        //       style={{ marginRight: 8 }}
        //     >
        //       Save
        //     </Typography.Link>
        //     <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
        //       <a>Cancel</a>
        //     </Popconfirm>
        //   </span>
        // ) : (
        //   <Typography.Link
        //     // disabled={editingKey !== ""}
          //  edit(record)
        //   >
        //     Edit
        //   </Typography.Link>
        // );
      // },
    // },
    Table.SELECTION_COLUMN,
  ];

  const mergedColumns: ColumnsType<Item> = columns.map((col:any) => {
   console.log({col});
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: Item) => ({
        record,  
        inputType: "string",
        dataIndex: col.dataIndex,
        title: col.title,
        // editing: isEditing(record),
      }),
      // onRow:(record:Item, rowIndex) => {
      //   return {
      //     onChange: (event: ChangeEvent<HTMLInputElement>) => {
      //       console.log(record, rowIndex);
      //       console.log(event.target.value);
      //       setSaturday(event.target.value);
      //     }
      //   };
      // }
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              console.log(record, rowIndex);
              console.log(event.target.value);
              // setSaturday(event.target.value);
            },
            // onClick: (event) => {console.log("hello")},
          };
        }}
        // components={{
        //   body: {
        //     cell: EditableCell,
        //   },
        // }}
       
        bordered
        dataSource={data}
        columns={mergedColumns}

         rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        // rowClassName="editable-row"
        // pagination={{
        //   onChange: cancel,
        // }}
        pagination={{ hideOnSinglePage: true }}
      />
    </Form>
  );
};

export default BranchTimeEdit;
