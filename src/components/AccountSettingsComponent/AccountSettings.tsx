import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin, Upload, message } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { useState } from "react";

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error("Image must smaller than 5MB!");
  }
  return isJpgOrPng && isLt5M;
};

export function AccountSettings() {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        form.setFieldValue("ownerImage", {
          name: info.file.name,
          size: info.file.size,
          type: info.file.type,
          base64: url,
        });
      });
    }
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="bg-white px-10 sm:px-20 py-10 rounded-md">
      <h3 className="font-bold py-2 text-[23px] text-purple-700 pb-8">
        Account Settings
      </h3>
      <Form
        {...formItemLayout}
        form={form}
        initialValues={{ remember: true }}
        name="accountSettings"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{
          maxWidth: 650,
        }}
      >
        <Form.Item name="ownerImage">
          <Upload
            beforeUpload={beforeUpload}
            fileList={undefined}
            listType="picture-card"
            name="ownerImageUpload"
            onChange={handleImageChange}
            showUploadList={false}
          >
            {imageUrl ? (
              <img className="rounded-lg p-1" src={imageUrl} alt="Image" />
            ) : (
              <button className="text-gray-500" type="button">
                {loading ? (
                  <Spin />
                ) : (
                  <>
                    <PlusOutlined />
                    <div>Upload</div>
                  </>
                )}
              </button>
            )}
          </Upload>
        </Form.Item>
        <div className="block gap-5 md:flex">
          <Form.Item label="Name" name="ownerName">
            <Input size="large" placeholder="Update Owner Name" />
          </Form.Item>

          <Form.Item label="Restaurant Name" name="restaurantName">
            <Input size="large" placeholder="Update Restaurant Name" />
          </Form.Item>
        </div>

        <div className="block gap-5 md:flex">
          <Form.Item label="Password" name="password">
            <Input.Password size="large" placeholder="Update Owner Password" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{
              fontSize: "large",
              height: "3rem",
            }}
          >
            Update Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
