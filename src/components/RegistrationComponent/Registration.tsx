import { Button, Checkbox, Divider, Form, Input, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppLogo } from "@/assets/Logo";
import axios from "axios";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface FieldType {
  restaurantName?: string;
  fullName?: string;
  email?: string;
  password?: string;
  remember?: string;
}

const RegistrationPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

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

  const showSuccessMessage = () => {
    messageApi.open({
      type: "success",
      content: "Registration Successful!",
    });
  };

  const showErrorMessage = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const formStyles = {
    padding: isLargeScreen ? "30px" : "15px",
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL as string}/api/v1/owners/register`,
      values
    );
    if (data.isSuccess) {
      form.resetFields();
      showSuccessMessage();
    } else showErrorMessage(data.errors[0].description);
    console.log("data", data);
  };

  return (
    <div className="min-h-screen flex items-center bg-[#EEF2F6]">
      <div className="w-full py-20 px-7 flex justify-center">
        {contextHolder}
        <Form
          form={form}
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
              <AppLogo />
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
            label="Owner Name"
            name="fullName"
            rules={[{ required: true, message: "Owner Name is required" }]}
          >
            <Input placeholder="Owner Name" size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Restaurant Name"
            name="restaurantName"
            rules={[{ required: true, message: "Restaurant Name is required" }]}
          >
            <Input placeholder="Restaurant Name" size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: "Email Address / Username is required",
              },
              {
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Email is not valid",
              },
            ]}
          >
            <Input placeholder="Email Address" size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              {
                pattern:
                  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+-=|\\])[0-9a-zA-Z*.!@#$%^&(){}[\]:;<>,.?/~_+-=|\\]+$/,
                message:
                  "Password must contains uppercase, lowsercase, number and special character",
              },
            ]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item<FieldType> valuePropName="checked">
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
