import { Button, Checkbox, Divider, Form, Input } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginPage: React.FC = () => (
  <div className="h-screen bg-gray-100">
    <div className="w-full p-20 flex justify-center">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="p-10 rounded bg-white w-[28rem]"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-700">
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
          <div className="flex justify-between">
            <Checkbox>Keep me logged in</Checkbox>
            <div className="text-purple-700 font-medium">Forgot Password?</div>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-purple-700 text-white"
            htmlType="submit"
            block
            size="large"
          >
            Sign In
          </Button>
        </Form.Item>
        <Divider />
        <div className="text-center font-medium">Don't have an account?</div>
      </Form>
    </div>
  </div>
);

export default LoginPage;
