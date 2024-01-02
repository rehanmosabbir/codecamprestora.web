import { FieldType } from "@/types/BreanchCreationTypes";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { Divider } from "antd";
import Meta from "antd/es/card/Meta";
import BranchTimeEdit from "./BranchTimeEdit";
import { useState } from "react";
import { useBranchDetails } from "./Zustand/Zustand";

export const BranchInfoEdit = ({
  editInfoOff,
}: {
  editInfoOff: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const [saturday, setSaturday] = useState({ start: "", end: "" });
  const {
    branchName,
    contactNumber,
    branchAddress,
  //   openingHoursDetails,
    updateBranchName,
    updateContactNumber,
    updateBranchAddress,
  //   updateOpeningHoursDetails,
  } = useBranchDetails();
  
 /// get Value function

  const onFinish = (values: any) => {
    console.log("Success:", values);
    updateBranchName(values.branchName);
    updateContactNumber(values.contactNumber);
    updateBranchAddress(values.branchAddress);
    // console.log(saturday);
    editInfoOff(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Card
        title="Branch Information"
        className="grid col-span-2 justify-center"
        style={{ width: 900 }}
      >
        <Form
          name="basic"
          style={{ width: 850 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="bg-white rounded-lg"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Branch Name:"
                name="branchName"
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please input your Branch Name!" },
                ]}
              >
                <Input
                  className="text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                  placeholder="Enter Branch Name"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item<FieldType>
                label="Contact Number:"
                labelCol={{ span: 24 }}
                name="contactNumber"
                rules={[
                  { required: true, message: "Please input Contact Number!" },
                ]}
              >
                <Input
                  className="text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                  placeholder="Enter Contact Number"
                  size="large"
                  type="tel"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Branch Address:"
                name="branchAddress"
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please input your Branch Name!" },
                ]}
              >
                <Input
                  className="text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                  placeholder="Enter Branch Address"
                  size="large"
                />
              </Form.Item>
            </Col>

            {/* <Col span={12}>
              <Form.Item<FieldType>
                label="Branch ID"
                labelCol={{ span: 24 }}
                name="BranchID"
                rules={[
                  { required: true, message: "Please input Branch ID!" },
                ]}
              >
                <Input
                  className="text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                  placeholder="Enter Branch ID"
                  size="large"
                  type="number"
                />
              </Form.Item>
            </Col> */}
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <div>
                <Meta title="Opening Hours" />
                <Divider />
                <BranchTimeEdit  />
              </div>
            </Col>
          </Row>

          <hr className="mb-3" />
          <div className="flex ">
            <Form.Item>
              <Button
                className="bg-purple-700 font-medium hover:bg-purple-600 text-white"
                htmlType="submit"
                type="primary"
              >
                Save Changes
              </Button>
            </Form.Item>
            <Button
              className=" ml-2 bg-purple-700 font-medium hover:bg-purple-600 text-white"
              onClick={() => editInfoOff(true)}
              type="primary"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};
