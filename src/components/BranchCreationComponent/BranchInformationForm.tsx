import React from "react";
import { FieldType } from "@/types/BreanchCreationTypes";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Divider,
} from "antd";
import Meta from "antd/es/card/Meta";
import BranchTimeEdit from "./BranchTimeEdit";
import { useBranchDetails } from "./Zustand/Zustand";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import {
  districtData,
  divisionData,
  thanaData,
} from "./DivisionDistrictThanaApi/DivisionDistrictThanaApi";

export const BranchInformationForm = (
  {formClose}
: {
  formClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const editInfoOff = formClose;
  // console.log({editInfoOff});
  const {
    branchName,
    isAvailable,
    priceRangeValue,
    openingHoursDetails,
    cuisineTypes,
    areaDetails,
    divisionName,
    districtName,
    thanaName,
    updateBranchName,
    updateIsAvailable,
    updateDivisionName,
    updateDistrictName,
    updateThanaName,
    updatePriceRangeValue,
    updateCuisineTypes,
    updateAreaDetails,
    setMainArrayOfOpeningDetails,
  } = useBranchDetails();

  const [district, setDistrict] = useState([] as any);
  const [thana, setThana] = useState([] as any);

  const handleDivisionChange = (value: string) => {
    // console.log("thanaaaaaa----------", value);
    setDistrict(districtData[value]);
  };

  const handleDistrictChange = (value: string) => {
    console.log("thanaaaaaa----------", value);
    setThana(thanaData[value]);
  };

  const handelPriceRange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
  };

  const handelResturentisAvailable = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
  };

  const handleCusineType = (value: string) => {
    console.log(`selected ${value}`);
  };

  console.log("Branch Information Edit page--");

  const onFinish = (values: any) => {
    console.log("Success:------", values);

    if (values.branchName !== undefined) updateBranchName(values.branchName);
    if (values.isAvailable !== undefined) updateIsAvailable(values.isAvailable);
    if (values.priceRangeValue !== undefined)
      updatePriceRangeValue(values.priceRangeValue);
    if (values.cuisineTypes !== undefined)
      updateCuisineTypes(values.cuisineTypes);
    if (values.areaDetails !== undefined) updateAreaDetails(values.areaDetails);
    if (values.divisionName !== undefined)
      updateDivisionName(values.divisionName);
    if (values.districtName !== undefined)
      updateDistrictName(values.districtName);
    if (values.thanaName !== undefined) updateThanaName(values.thanaName);
    formClose(false);
    setMainArrayOfOpeningDetails(openingHoursDetails);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    formClose(false);
  };

  return (
    <div>
      {" "}
      <Form
        name="basic"
        style={{ width: 850 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="bg-white rounded-lg"
      >
        <Row gutter={25}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<Title level={5}>Branch Name:</Title>}
              name="branchName"
              labelCol={{ span: 24 }}
              // rules={[
              //   { required: true, message: "Please input your Branch Name!" },
              // ]}
            >
              <Input
                className="text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                placeholder="Enter Branch Name"
                size="large"
                defaultValue={branchName}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<FieldType>
              label={<Title level={5}>Is Available:</Title>}
              labelCol={{ span: 24 }}
              name="isAvailable"
              // rules={[
              //   { required: true, message: "Please input Contact Number!" },
              // ]}
            >
              <Radio.Group
                onChange={handelResturentisAvailable}
                defaultValue={isAvailable}
              >
                <Radio value={1}>YES</Radio>
                <Radio value={2}>NO</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={25}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<Title level={5}>Price Range:</Title>}
              name="priceRangeValue"
              labelCol={{ span: 24 }}
              // rules={[
              //   { required: true, message: "Please input your Branch Name!" },
              // ]}
            >
              <Radio.Group
                onChange={handelPriceRange}
                defaultValue={priceRangeValue}
              >
                <Radio value={1}>Low</Radio>
                <Radio value={2}>Medium</Radio>
                <Radio value={3}>High</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<FieldType>
              label={<Title level={5}>Cuisine Types:</Title>}
              labelCol={{ span: 24 }}
              name="cuisineTypes"
              // rules={[
              //   { required: true, message: "Please input Contact Number!" },
              // ]}
            >
              <Select
                size="large"
                placeholder="Enter cuisine types"
                mode="tags"
                style={{ width: "100%" }}
                onChange={(e: string[]) => {
                  handleCusineType;
                }}
                tokenSeparators={[","]}
                defaultValue={cuisineTypes}
              />
            </Form.Item>
          </Col>
        </Row>

        <Meta title="Branch Address:" />
        <Divider />
        <Row gutter={25}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Area Details:"
              labelCol={{ span: 24 }}
              name="areaDetails"
              // rules={[
              //   { required: true, message: "Please input Contact Number!" },
              // ]}
            >
              <Input
                className="text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                placeholder="Enter Street Number"
                size="large"
                type="tel"
                defaultValue={areaDetails}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Division"
              name="divisionName"
              labelCol={{ span: 24 }}
              // rules={[
              //   { required: true, message: "Please input your Branch Name!" },
              // ]}
            >
              <Select
                size="large"
                placeholder="Select a Division"
                onChange={handleDivisionChange}
                options={divisionData.map((division: string) => ({
                  label: division,
                  value: division,
                }))}
                defaultValue={divisionName}
                allowClear
              ></Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<FieldType>
              label="District"
              labelCol={{ span: 24 }}
              name="districtName"
              // rules={[
              //   { required: true, message: "Please input Contact Number!" },
              // ]}
            >
              <Select
                placeholder="Select a District"
                onChange={handleDistrictChange}
                options={district.map((data: any) => ({
                  label: data,
                  value: data,
                }))}
                // onChange={onGenderChange}
                defaultValue={districtName}
                size="large"
                allowClear
              >
                {/* <p >No Options</p> */}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<FieldType>
              label="Thana"
              name="thanaName"
              labelCol={{ span: 24 }}
              // rules={[
              //   { required: true, message: "Please input your Branch Name!" },
              // ]}
            >
              <Select
                placeholder="Select a Thana"
                size="large"
                options={thana?.map((data: string) => ({
                  label: data,
                  value: data,
                }))}
                defaultValue={thanaName}
                allowClear
              ></Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <div>
              <Meta title="Opening Hours:" />
              <Divider />
              <BranchTimeEdit />
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
            onClick={() => formClose(false)}
            type="primary"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};
