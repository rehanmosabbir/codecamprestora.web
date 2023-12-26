import React from "react";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { FieldType } from "@/types/BreanchCreationTypes";

const BranchCreateModal = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
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
        className="bg-white !p-10"
      >
        <div className="flex justify-center mb-8">
          <Image src={logo} width={100} height={100} alt="logo" priority />
        </div>

        <h1 className="p-3 text-[16px] font-semibold text-center mb-3">
          Create New Branch
        </h1>

        <Form.Item<FieldType>
          label="Branch Name:"
          name="branchName"
          labelCol={{ span: 24 }}
          rules={[
            { required: true, message: "Please input your Branch Name!" },
          ]}
        >
          <Input
            className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
            placeholder="Enter Branch Name"
            size="large"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Contact Number:"
          labelCol={{ span: 24 }}
          name="contactNumber"
          rules={[{ required: true, message: "Please input Contact Number!" }]}
        >
          <Input
            className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
            placeholder="Enter Contact Number"
            size="large"
            type="tel"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Branch Address:"
          labelCol={{ span: 24 }}
          name="location"
          rules={[
            { required: true, message: "Please input Branch's address!" },
          ]}
        >
          <Input
            className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1 "
            placeholder="Enter Branch Address"
            size="large"
            type="text"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Opening Hours:"
          labelCol={{ span: 24 }}
          name="openingHours"
          rules={[{ required: true, message: "Please input Opening Hours!" }]}
        >
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
};

export default BranchCreateModal;
