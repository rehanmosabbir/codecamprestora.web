import { Button, Checkbox, Divider, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";

import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface FieldType {
  restaurantName?: string;
  ownerName?: string;
  address?: string;
  email?: string;
  password?: string;
  remember?: string;
}

const RegistrationPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const formStyles = {
    padding: isLargeScreen ? "30px" : "15px",
  };
  return (
    <div className="min-h-screen flex items-center bg-gray-100">
      <div className="w-full py-20 px-7 flex justify-center">
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={formStyles}
          className="shadow-md rounded-md bg-white w-[26rem] lg:w-[28rem]"
        >
          <div className="flex justify-center items-center pb-8">
            <div>
              <Image width={90} src={logo} alt="logo" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-purple-700">
              Sign Up
            </p>
            <p className="py-4 text-gray-500 text-base">
              Enter your credentials to continue
            </p>
            <p className="pb-4 text-base font-semibold">
              Sign up with Email address
            </p>
          </div>
          <Form.Item<FieldType>
            label="Restaurant Name"
            name="restaurantName"
            rules={[{ required: true, message: "Restaurant Name is required" }]}
          >
            <Input placeholder="Restaurant Name" size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Owner Name"
            name="ownerName"
            rules={[{ required: true, message: "Owner Name is required" }]}
          >
            <Input placeholder="Owner Name" size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Restaurant Address"
            name="address"
            rules={[
              { required: true, message: "Restaurant Address is required" },
            ]}
          >
            <Input placeholder="Restaurant Address" size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email Address / Username"
            name="email"
            rules={[
              {
                required: true,
                message: "Email Address / Username is required",
              },
              {
                pattern: /^[A-Za-z0-9_.@]+(?:-[A-Za-z0-9]+)*$/,
                message: "Use A-Z, a-z, 0-9, @, _, and . characters",
              },
            ]}
          >
            <Input placeholder="Email Address / Username" size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox className="text-gray-500 font-semibold">
              Agree with <span className="underline">Terms & Condition.</span>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="bg-purple-700 font-medium hover:bg-purple-600 text-white"
              htmlType="submit"
              block
              size="large"
            >
              Sign Up
            </Button>
          </Form.Item>
          <Divider />
          <div className="text-center font-medium">
            <Link href={"/login"}>Already have an account?</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationPage;
