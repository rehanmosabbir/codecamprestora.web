import { FieldType } from "@/types/BreanchCreationTypes";
import { Button, Card, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { Divider, Radio, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Meta from "antd/es/card/Meta";

interface DataType {
  key: React.Key;
  Days: string;
  OpeningHours: string;
  ClosingHours: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Days",
    dataIndex: "Days",
    align: "center",
    // render: (text: string) => <a>{text}</a>,
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

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  // getCheckboxProps: (record: DataType) => ({
  //   disabled: record.name === "Disabled User", // Column configuration not to be checked
  //   name: record.name,
  // }),
};

export const BranchInfoEdit = ({
  editInfoOff,
}: {
  editInfoOff: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectionType, setSelectionType] = useState<"checkbox">("checkbox");

  const onFinish = (values: any) => {
    console.log("Success:", values);
    editInfoOff(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Card
        title="Branch Information"
        className="grid col-span-2 justify-center"
        style={{ width: 700 }}
      >
        <Form
          name="basic"
          style={{ width: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="bg-white  rounded-lg"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Branch Name:"
                name="branchName"
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please input your Branch Name!" },
                ]}
              >
                <Input
                  className="text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                  placeholder="Enter Branch Name"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item<FieldType>
                label="Contact Number:"
                labelCol={{ span: 24 }}
                name="contactNumber"
                rules={[
                  { required: true, message: "Please input Contact Number!" },
                ]}
              >
                <Input
                  className="text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                  placeholder="Enter Contact Number"
                  size="large"
                  type="tel"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Branch Address:"
                name="location"
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please input your Branch Name!" },
                ]}
              >
                <Input
                  className="text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                  placeholder="Enter Branch Address"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item<FieldType>
                label="Opening Hours:"
                labelCol={{ span: 24 }}
                name="openingHours"
                rules={[
                  { required: true, message: "Please input Contact Number!" },
                ]}
              >
                <Input
                  className="text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                  placeholder="Enter Opening Hours"
                  size="large"
                  type="tel"
                />
              </Form.Item>
            </Col>
          </Row>

          <div>
            <Meta title="Opening Hours" />
            <Divider />
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              pagination={{ hideOnSinglePage: true }}
            />
          </div>
          <hr className="mb-3" />
          <div className="flex justify-center">
            <Form.Item>
              <Button
                className="bg-purple-700 font-medium hover:bg-purple-600 text-white"
                htmlType="submit"
                type="primary"
              >
                Save Changes
              </Button>
            </Form.Item>
            <Button
              className=" ml-2 bg-purple-700 font-medium hover:bg-purple-600 text-white"
              onClick={() => editInfoOff(true)}
              type="primary"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};
