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

type FieldType = {
  username?: string;
  password?: string;
  agreement?: string;
  restarurantname?: string;
  ownername?: string;
  email?: string;
  address?: string;
};

const App: React.FC = () => (
  <div className="full-h-screen bg-gray-100 font-sans">
    <div className="w-full p-20 flex justify-center">
      <Form
        name="basic"
        // style={{ maxWidth: 600 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="bg-white rounded-lg shadow-lg p-10 w-[28rem]"
      >
        <div className="flex justify-center mb-8">
          <Image src={logo} width={100} height={100} alt="logo" priority />
        </div>

        <div className=" text-center">
          <h2 className=" text-purple-700 font-bold text-2xl">Sign Up</h2>
          <h3 className=" text-gray-600 text-xl mb-3">
            Enter your credentials to continue
          </h3>
        </div>
        <h3 className="p-3 text-lg font-semibold text-center mb-3">
          Sign up with Valid Information
        </h3>

        <Form.Item<FieldType>
          name="restarurantname"
          rules={[
            { required: true, message: "Please input your Restaurant Name!" },
          ]}
        >
          <label> Restaurant Name:</label>
          <Input
            className="py-4 text-xl text-gray-600 hover:bg-gray-100"
            placeholder="Restaurent Name"
            size="large"
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="ownername"
          rules={[{ required: true, message: "Please input Owner's Name!" }]}
        >
          <label> Owner Name:</label>
          <Input
            className="py-4 text-xl text-gray-600 hover:bg-gray-100"
            placeholder="Owner Name"
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
            className="py-4 text-xl text-gray-600 hover:bg-gray-100"
            placeholder="Restaurant Address"
            size="large"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <label> Email:</label>
          <Input
            className="py-4 text-xl text-gray-600 hover:bg-gray-100"
            placeholder="Email"
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
            className="py-4 text-xl text-gray-600 hover:bg-gray-100"
            placeholder="Password"
            type="password"
            size="large"
          />
        </Form.Item>

        <Form.Item<FieldType> name="agreement" valuePropName="checked">
          <Checkbox className="text-3xl">
            Agree with <a href="">Terms & Condition</a>.
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-purple-700 text-white text-lg h-14"
            htmlType="submit"
            block
          >
            Register
          </Button>
        </Form.Item>
        <hr className="mb-3" />

        <div className="font-medium text-xl text-center">
          <Link href=""> Already have an account?</Link>
        </div>
      </Form>
    </div>
  </div>
);

export default App;
