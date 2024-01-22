import React, { useEffect } from "react";
import { FieldType } from "@/types/BreanchCreationTypes";
import {
  Button,
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
import { useMutation } from "react-query";
import axios from "axios";

export const BranchInformationForm = (props: {
  formClose: React.Dispatch<React.SetStateAction<boolean>>;
  branchID: string;
}) => {
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
  console.log({ props });
  const { formClose, branchID } = props;
  console.log({ branchID });
  // let flag =branchID;
  // // useEffect(() => {

  //   if (branchID ==='' && flag ==='') {
  //     // updateBranchName("");
  //     // updateIsAvailable(0);
  //     // updateDivisionName("");
  //     // updateDistrictName("");
  //     // updateThanaName("");
  //     // updatePriceRangeValue(0);
  //     // updateCuisineTypes([]);
  //     // updateAreaDetails("");
  //     console.log("useEffect");
  //     flag = 'hello';

  //     // setMainArrayOfOpeningDetails(),
  //   }
  // // }, []);

  console.log({ branchName });
  console.log({ isAvailable });
  console.log({ priceRangeValue });
  // console.log({openingHoursDetails});
  console.log({ cuisineTypes });
  console.log({ areaDetails });
  console.log({ divisionName });
  console.log({ districtName });
  console.log({ thanaName });

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

  const mutation = useMutation({
    mutationFn: async (branchCreationInformation: any) => {
      console.log({ branchCreationInformation });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/branch`,
        branchCreationInformation
      );
      // const response = axios.post(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/branch/resturant/54a45ca9-3ccc-4ae8-851d-949e1a609837`
      // );
      console.log("created data --", response);
      return response;
    },
    onSuccess(data, variables, context) {
      console.log("onSuccess=== ", data);
    },
    onError(error, variables, context) {
      console.log("onError=== ", error);
    },
  });

  // const {mutate} = useMutation({
  //  mutationFn: (obj:any) => return null,

  // })

  // console.log("Branch Information Edit page--");

  const onFinish = (values: any) => {
    console.log("Success:------", values);

    // if (values.branchName !== undefined) updateBranchName(values.branchName);
    // if (values.isAvailable !== undefined) updateIsAvailable(values.isAvailable);
    // if (values.priceRangeValue !== undefined)
    //   updatePriceRangeValue(values.priceRangeValue);
    // if (values.cuisineTypes !== undefined)
    //   updateCuisineTypes(values.cuisineTypes);
    // if (values.areaDetails !== undefined) updateAreaDetails(values.areaDetails);
    // if (values.divisionName !== undefined)
    //   updateDivisionName(values.divisionName);
    // if (values.districtName !== undefined)
    //   updateDistrictName(values.districtName);
    // if (values.thanaName !== undefined) updateThanaName(values.thanaName);
    // setMainArrayOfOpeningDetails(openingHoursDetails);
    // console.log({ openingHoursDetails });
    const cuisineTypesObjForm = values.cuisineTypes.map((value:string) =>  ( {
      cuisineTag: value,
    }))
    console.log(cuisineTypesObjForm)
    mutation.mutate({
      name: values.branchName,
      isAvailable: (values.isAvailable===1) ? true: false ,
      priceRange: values.priceRangeValue,
      openingClosingTimes: openingHoursDetails,
      //  [
      //   {
      //     day: 0,
      //     openingHours: "10:30 AM",
      //     closingHours: "10:30 PM",
      //     isClosed: true,
      //   },
      // ],
      cuisineTypes: cuisineTypesObjForm,
      address: {
        latitude: 123.2,
        longitude: 2.3,
        division: values.divisionName,
        district: values.districtName,
        thana: values.thanaName,
        areaDetails: values.areaDetails
      },
      restaurantId: "eabf4311-0451-4ff7-a2f7-f7718b6e0caf",
    });
    console.log({ mutation });
    formClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    formClose(false);
  };

  return (
    <div>
      <Form
        name="basic"
        style={{ width: "100%" }}
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
              rules={
                branchName === undefined
                  ? [
                      {
                        required: true,
                        message: "Please input your Branch Name!",
                      },
                    ]
                  : undefined
              }
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
              label={<Title level={5}>Available:</Title>}
              labelCol={{ span: 24 }}
              name="isAvailable"
              rules={
                isAvailable === undefined
                  ? [{ required: true, message: "Please confirm availability" }]
                  : undefined
              }
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
              rules={
                priceRangeValue === undefined
                  ? [{ required: true, message: "Please select price range" }]
                  : undefined
              }
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
              rules={
                cuisineTypes === undefined
                  ? [{ required: true, message: "Please input cuisine types" }]
                  : undefined
              }
            >
              <Select
                size="large"
                placeholder="Enter cuisine types"
                mode="tags"
                style={{ width: "100%" }}
                onChange={(
                  e: {
                    cuisineTag: string;
                  }[]
                ) => {
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
              rules={
                areaDetails === undefined
                  ? [{ required: true, message: "Please input area details" }]
                  : undefined
              }
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
              rules={
                divisionName === undefined
                  ? [{ required: true, message: "Please input division name" }]
                  : undefined
              }
            >
              <Select
                size="large"
                placeholder="Select a Division"
                onChange={handleDivisionChange}
                options={divisionData?.map((division: string) => ({
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
              rules={
                districtName === undefined
                  ? [{ required: true, message: "Please input district name" }]
                  : undefined
              }
            >
              <Select
                placeholder="Select a District"
                onChange={handleDistrictChange}
                options={district?.map((data: any) => ({
                  label: data,
                  value: data,
                }))}
                defaultValue={districtName}
                size="large"
                allowClear
              ></Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<FieldType>
              label="Thana"
              name="thanaName"
              labelCol={{ span: 24 }}
              rules={
                thanaName === undefined
                  ? [{ required: true, message: "Please input thana name" }]
                  : undefined
              }
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
