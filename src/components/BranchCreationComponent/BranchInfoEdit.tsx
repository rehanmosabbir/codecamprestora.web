import { FieldType } from "@/types/BreanchCreationTypes";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";

export const BranchInfoEdit = ({
  editInfoOff,
}: {
  editInfoOff: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    editInfoOff(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        requiredMark={true}
        name="basic"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="bg-white p-10 rounded-lg"
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

        <div className="flex">
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
        <hr className="mb-3" />
      </Form>
    </div>
  );
};
