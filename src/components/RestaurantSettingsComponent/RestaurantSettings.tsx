import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin, Upload, message } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

export function RestaurantSettings() {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [restaurantName, setRestaurantName] = useState();

  const data = useSession();
  const restaurantId = data?.data?.user?.restaurantId;

  useEffect(() => {
    const getRestaurant = async () => {
      if (restaurantId) {
        const data: any = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/Restaurants/${restaurantId}`
        );
        setRestaurantName(data.data.data.name);
      }
    };
    getRestaurant();
  }, []);

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
        form.setFieldValue("restaurantImage", {
          name: info.file.name,
          size: info.file.size,
          type: info.file.type,
          base64: url,
        });
      });
    }
  };

  const onFinish = async (values: any) => {
    const data: any = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/Restaurants`,
      {
        id: restaurantId,
        name: values.restaurantName,
        imageId: "60C28298-B55A-4497-A3B4-0EB21DF208CB",
      }
    );
    if (data.data.isSuccess) {
      showSuccessMessage();
    } else {
      showErrorMessage("Some Error occure");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const showSuccessMessage = () => {
    messageApi.open({
      type: "success",
      content: "Update Successful!",
    });
  };

  const showErrorMessage = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  return (
    <div className="bg-white px-10 sm:px-20 py-10 rounded-md">
      {contextHolder}
      <h3 className="font-bold py-2 text-[23px] text-purple-700 pb-8">
        Restaurant Settings
      </h3>
      <Form
        {...formItemLayout}
        form={form}
        initialValues={{ remember: true }}
        name="accountSettings"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        fields={[
          {
            name: ["restaurantName"],
            value: restaurantName,
          },
        ]}
        style={{
          maxWidth: 650,
        }}
      >
        <Form.Item name="restaurantImage">
          <Upload
            beforeUpload={beforeUpload}
            fileList={undefined}
            listType="picture-card"
            name="restaurantImageUpload"
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

        <Form.Item
          label="Restaurant Name"
          name="restaurantName"
          rules={[{ required: true, message: "Please Enter Restaurant Name" }]}
        >
          <Input size="large" placeholder="Update Restaurant Name" />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{
              fontSize: "large",
              height: "3rem",
            }}
          >
            Update Restaurant
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
