import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface FieldType {
  username?: string;
  password?: string;
  agreement?: string;
  restarurantname?: string;
  ownername?: string;
  email?: string;
  address?: string;
}

const Registration = () => (
  <div className="full-h-screen bg-gray-100 font-sans">
    <div className="w-full !py-20 !px-20  flex justify-center">
      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="bg-white rounded-lg shadow-lg !p-10 w-[28rem]"
      >
        <div className="flex justify-center mb-8">
          <Image src={logo} width={100} height={100} alt="logo" priority />
        </div>

        <div className=" text-center">
          <h2 className=" text-purple-700 font-bold text-[23px] ">Sign Up</h2>
          <h3 className=" text-slate-500  text-[18px] mb-2 text-nowrap ">
            Enter your credentials to continue
          </h3>
        </div>
        <h3 className="p-3 text-[16px] font-semibold text-center mb-3">
          Sign up with Valid Information
        </h3>

        <Form.Item<FieldType>
          name="restarurantname"
          rules={[
            { required: true, message: "Please input your Restaurant Name!" },
          ]}
        >
          <label className="mb-1 text-[5px]"> Restaurant Name:</label>
          <Input
            className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
            placeholder="Enter Restaurent Name"
            size="large"
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="ownername"
          rules={[{ required: true, message: "Please input Owner's Name!" }]}
        >
          <label> Owner Name:</label>
          <Input
            className="!py-3 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
            placeholder="Enter Owner Name"
            size="large"
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="address"
          rules={[
            { required: true, message: "Please input Restaurant's address!" },
          ]}
        >
          <label> Restaurant Address:</label>
          <Input
            className="!py-3 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1 "
            placeholder="Enter Restaurant Address"
            size="large"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <label> Email:</label>
          <Input
            className="!py-3 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
            placeholder="Enter Email"
            type="email"
            size="large"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <label> Password:</label>
          <Input.Password
            className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
            placeholder="Enter Password"
            type="password"
            size="large"
          />
        </Form.Item>

        <Form.Item<FieldType> name="agreement" valuePropName="checked">
          <Checkbox className="text-[20px] font-semibold">
            Agree with <a href="">Terms & Condition</a>.
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            className="!bg-purple-700 !text-white text-lg !h-12 font-semibold !hover:text-white"
            htmlType="submit"
            block
          >
            Register
          </Button>
        </Form.Item>
        <hr className="mb-3" />

        <div className="font-medium text-[16px] text-center">
          <Link href="#"> Already have an account?</Link>
        </div>
      </Form>
    </div>
  </div>
);

export default Registration;
