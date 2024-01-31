import Link from "next/link";
import { AppLogo } from "@/assets/Logo";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { LoginCredential } from "@/types/auth";
import { Button, Checkbox, Divider, Form, Input } from "antd";

interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [logError, setError] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  const onFinish = async (values: LoginCredential) => {
    const { username, password } = values;

    // console.log('p', values);

    try {
      const result = await signIn("credentials", {
        redirect: true,
        username,
        password,
        // callbackUrl: "/branches",
      });

      // console.log('ok', result);

      // if (result?.error) {
      //   setError(true);
      // } else {
      //   await router.push("/branches");
      // }
    } catch (error) {
      console.error("Error occurred during authentication:", error);
    }
  };
  console.log("osama");
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo, "osama");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
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
    <div className="min-h-screen flex items-center bg-[#EEF2F6]">
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
              <AppLogo />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-[#673AB7]">
              Hi, Welcome Back
            </h1>
            <h3 className="pb-4 text-[#697586] text-base">
              Enter your credentials to continue
            </h3>
          </div>
          <Form.Item<FieldType>
            label="Email Address"
            name="username"
            rules={[
              {
                required: true,
                message: "Email Address is required",
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
              {
                required: true,
                message: "Password is required",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
                message:
                  "Password must contains uppercase, lowsercase, number and special character",
              },
            ]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            className=""
          >
            <Checkbox style={{ color: "#364152" }}>Keep me logged in</Checkbox>
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
