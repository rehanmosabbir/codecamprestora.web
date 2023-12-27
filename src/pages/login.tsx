import { Button, Checkbox, Divider, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import { useRouter } from "next/router";
import { useState } from "react";

interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [logError, setError] = useState<boolean>(false);
  const onFinish = async (values: any) => {
    const { username, password } = values;
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError(true);
      } else {
        await router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error occurred during authentication:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="min-h-screen flex items-center bg-gray-100">
      <div className="w-full py-20 px-3 flex justify-center">
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ padding: "30px" }}
          className="py-10 px-4 sm:px-6 shadow-md rounded-md bg-white w-[26rem] lg:w-[28rem]"
        >
          <div className="flex justify-center items-center pb-8">
            <div>
              <Image width={90} src={logo} alt="logo" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-purple-700">
              Hi, Welcome Back
            </h1>
            <h3 className="py-4 text-gray-500 text-base">
              Enter your credentials to continue
            </h3>
          </div>
          <Form.Item<FieldType>
            label="Email Address / Username"
            name="username"
            rules={[{ required: true, message: "Email is required" }]}
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
            <Checkbox className="text-gray-500">Keep me logged in</Checkbox>
          </Form.Item>
          <span className="text-[14px] text-red-500">
            {logError ? (
              <span>Invalid Username or Password</span>
            ) : (
              <span></span>
            )}
          </span>
          <Form.Item>
            <Button
              type="primary"
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
            <Link href={"/registration"}>Don't have an account?</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
