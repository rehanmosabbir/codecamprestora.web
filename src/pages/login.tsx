import { Button, Checkbox, ConfigProvider, Divider, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";

import logo from "../../public/images/logo.jpg";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
}

const LoginPage: React.FC = () => (
  <div className="h-screen bg-gray-100">
    <div className="w-full pt-20 px-5 sm:p-20 flex justify-center">
      <ConfigProvider
        theme={{
          components: {
            Button: { colorPrimaryHover: "#ffff" },
          },
        }}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="py-10 px-4 sm:px-6 rounded-md bg-white w-[26rem] lg:w-[28rem]"
        >
          <div className="flex justify-center items-center pb-8">
            <div>
              <Image width={50} src={logo} alt="logo" />
            </div>
            <div className="font-bold text-xl">BERRY</div>
          </div>
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-purple-700">
              Hi, Welcome Back
            </h1>
            <h3 className="p-4 text-gray-500 text-base">
              Enter your credentials to continue
            </h3>
          </div>
          <Form.Item<FieldType>
            name="username"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input placeholder="Email Address / Username" size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox className="text-gray-500">Keep me logged in</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              className="bg-purple-700 font-medium hover:bg-purple-600 text-white"
              htmlType="submit"
              block
              size="large"
            >
              Sign In
            </Button>
          </Form.Item>
          <Divider />
          <div className="text-center font-medium">
            <Link href={"/register"}>Don't have an account?</Link>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  </div>
);

export default LoginPage;
