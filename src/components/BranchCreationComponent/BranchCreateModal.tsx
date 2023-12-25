import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Image from "next/image";
import logo from "@/assets/logo.png";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface FieldType {
  branchName?: string;
  contactNumber?: string;
  location?: string;
  openingHours?: string;
  agreement?: string;
}

const BranchCreateModal = () => (
  <div>
    <Form
      name="basic"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="bg-white !p-10"
    >
      <div className="flex justify-center mb-8">
        <Image src={logo} width={100} height={100} alt="logo" priority />
      </div>

      <h1 className="p-3 text-[16px] font-semibold text-center mb-3">
        Create New Branch
      </h1>

      <Form.Item<FieldType>
        name="branchName"
        rules={[{ required: true, message: "Please input your Branch Name!" }]}
      >
        <label>Branch Name:</label>
        <Input
          className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
          placeholder="Enter Branch Name"
          size="large"
        />
      </Form.Item>
      <Form.Item<FieldType>
        name="contactNumber"
        rules={[{ required: true, message: "Please input Contact Number!" }]}
      >
        <label> Contact Number:</label>
        <Input
          className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
          placeholder="Enter Contact Number"
          size="large"
          type="tel"
        />
      </Form.Item>
      <Form.Item<FieldType>
        name="location"
        rules={[
          { required: true, message: "Please input Restaurant's address!" },
        ]}
      >
        <label> Restaurant Address:</label>
        <Input
          className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1 "
          placeholder="Enter Restaurant Address"
          size="large"
          type="text"
        />
      </Form.Item>
      <Form.Item<FieldType>
        name="openingHours"
        rules={[{ required: true, message: "Please input Opening Hours!" }]}
      >
        <label> Opening Hours:</label>
        <Input
          className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
          placeholder="Enter Opening Hours"
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button
          className="!bg-purple-700 !text-white text-lg !h-12 font-semibold !hover:text-white"
          htmlType="submit"
          block
        >
          Create Branch
        </Button>
      </Form.Item>
      <hr className="mb-3" />
    </Form>
  </div>
);

export default BranchCreateModal;
