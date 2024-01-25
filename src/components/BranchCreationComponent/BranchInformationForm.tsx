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
import axios from "axios";
import { useMutation } from "react-query";

export const BranchInformationForm = (
  props
: {
  formClose: React.Dispatch<React.SetStateAction<boolean>>,
  branchID: string| null |undefined

}) => {
  const { token } = theme.useToken();
  const {
    isInfoUpdate,
    branchName,
    isAvailable,
    priceRangeValue,
    openingHoursDetails,
    cuisineTypes,
    areaDetails,
    divisionName,
    districtName,
    thanaName,
  } = useBranchDetails();
  console.log({props});
  const {formClose, branchID} = props;
// useEffect(())[]
//   if(branchID==null)
//   {
//     updateBranchName("");
//     updateIsAvailable(0);
//     updateDivisionName("");
//     updateDistrictName("");
//     updateThanaName("");
//     updatePriceRangeValue(0),
//     updateCuisineTypes([]);
//     updateAreaDetails("");
//     // setMainArrayOfOpeningDetails(),
//   }


  const [district, setDistrict] = useState([] as any);
  const [thana, setThana] = useState([] as any);

  const handleDivisionChange = (value: string) => {
    setDistrict(districtData[value]);
  };

  const handleDistrictChange = (value: string) => {
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

  const createMutation = useMutation({
    mutationFn: async (branchCreationInformation: any) => {
      console.log({ branchCreationInformation });
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/branch`,
      //   branchCreationInformation
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/branch`,
        branchCreationInformation
      );
      // const response = axios.post(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/branch/resturant/54a45ca9-3ccc-4ae8-851d-949e1a609837`
      // );
      // const response= axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/branch/resturant/54a45ca9-3ccc-4ae8-851d-949e1a609837`)
      // console.log({response});
      // console.log("created data --", response);
      return response;
    },
    onSuccess(data, variables, context) {
      console.log("onSuccess=== ", data);
    },
    onError(error, variables, context) {
      console.log("onError=== ", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (branchCreationInformation: any) => {
      console.log({ branchCreationInformation });
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/branch`,
      //   branchCreationInformation
      const response = await axios.post(
        `http://54.203.205.46:5219/api/v1/branch`,
        branchCreationInformation
      );
      // const response = axios.post(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/branch/resturant/54a45ca9-3ccc-4ae8-851d-949e1a609837`
      // );
      // const response= axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/branch/resturant/54a45ca9-3ccc-4ae8-851d-949e1a609837`)
      // console.log({response});
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

  // console.log("Branch Information Edit page--");

  const onFinish = (values: any) => {
    console.log("123Success:------", values);

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
    // console.log("values.branchName ", values.branchName);
    const cuisineTypesObjForm = values?.cuisineTypes?.map((value: string) => ({
      cuisineTag: value,
    }));

    if (isInfoUpdate === true) {
      updateMutation.mutate({
        id: "c1922c17-0015-4c0e-be03-f611fb9e20a5",
        name: values.branchName === undefined ? branchName : values.branchName,
        isAvailable:
          values.isAvailable === undefined
            ? (isAvailable === 1)
            : (values.isAvailable === 1),
        priceRange:
          values.priceRangeValue === undefined
            ? priceRangeValue
            : values.priceRangeValue,
        openingClosingTimes: [
          {
            day: 0,
            openingHours: openingHoursDetails[0].OpeningHours,
            closingHours: openingHoursDetails[0].ClosingHours,
            isClosed: openingHoursDetails[0].IsOpen === "true" ? false : true,
          },
          {
            day: 1,
            openingHours: openingHoursDetails[1].OpeningHours,
            closingHours: openingHoursDetails[1].ClosingHours,
            isClosed: openingHoursDetails[1].IsOpen === "true" ? false : true,
          },
          {
            day: 2,
            openingHours: openingHoursDetails[2].OpeningHours,
            closingHours: openingHoursDetails[2].ClosingHours,
            isClosed: openingHoursDetails[2].IsOpen === "true" ? false : true,
          },
          {
            day: 3,
            openingHours: openingHoursDetails[3].OpeningHours,
            closingHours: openingHoursDetails[3].ClosingHours,
            isClosed: openingHoursDetails[3].IsOpen === "true" ? false : true,
          },
          {
            day: 4,
            openingHours: openingHoursDetails[4].OpeningHours,
            closingHours: openingHoursDetails[4].ClosingHours,
            isClosed: openingHoursDetails[4].IsOpen === "true" ? false : true,
          },
          {
            day: 5,
            openingHours: openingHoursDetails[5].OpeningHours,
            closingHours: openingHoursDetails[5].ClosingHours,
            isClosed: openingHoursDetails[5].IsOpen === "true" ? false : true,
          },
          {
            day: 6,
            openingHours: openingHoursDetails[6].OpeningHours,
            closingHours: openingHoursDetails[6].ClosingHours,
            isClosed: openingHoursDetails[6].IsOpen === "true" ? false : true,
          },
        ],
        cuisineTypes: cuisineTypesObjForm,
        address: {
          latitude: 123.2,
          longitude: 2.3,
          division:
            values.divisionName === undefined
              ? divisionName
              : values.divisionName,
          district:
            values.districtName === undefined
              ? districtName
              : values.districtName,
          thana: values.thanaName === undefined ? thanaName : values.thanaName,
          areaDetails:
            values.areaDetails === undefined ? areaDetails : values.areaDetails,
        },
        // restaurantId: "eabf4311-0451-4ff7-a2f7-f7718b6e0caf",
      });
    } else {
      createMutation.mutate({
        name: values.branchName,
        isAvailable: values.isAvailable === 1,
        priceRange: values.priceRangeValue,
        openingClosingTimes: [
          {
            day: 0,
            openingHours: openingHoursDetails[0].OpeningHours,
            closingHours: openingHoursDetails[0].ClosingHours,
            isClosed: openingHoursDetails[0].IsOpen === "true" ? false : true,
          },
          {
            day: 1,
            openingHours: openingHoursDetails[1].OpeningHours,
            closingHours: openingHoursDetails[1].ClosingHours,
            isClosed: openingHoursDetails[1].IsOpen === "true" ? false : true,
          },
          {
            day: 2,
            openingHours: openingHoursDetails[2].OpeningHours,
            closingHours: openingHoursDetails[2].ClosingHours,
            isClosed: openingHoursDetails[2].IsOpen === "true" ? false : true,
          },
          {
            day: 3,
            openingHours: openingHoursDetails[3].OpeningHours,
            closingHours: openingHoursDetails[3].ClosingHours,
            isClosed: openingHoursDetails[3].IsOpen === "true" ? false : true,
          },
          {
            day: 4,
            openingHours: openingHoursDetails[4].OpeningHours,
            closingHours: openingHoursDetails[4].ClosingHours,
            isClosed: openingHoursDetails[4].IsOpen === "true" ? false : true,
          },
          {
            day: 5,
            openingHours: openingHoursDetails[5].OpeningHours,
            closingHours: openingHoursDetails[5].ClosingHours,
            isClosed: openingHoursDetails[5].IsOpen === "true" ? false : true,
          },
          {
            day: 6,
            openingHours: openingHoursDetails[6].OpeningHours,
            closingHours: openingHoursDetails[6].ClosingHours,
            isClosed: openingHoursDetails[6].IsOpen === "true" ? false : true,
          },
        ],
        cuisineTypes: cuisineTypesObjForm,
        address: {
          latitude: 123.2,
          longitude: 2.3,
          division: values.divisionName,
          district: values.districtName,
          thana: values.thanaName,
          areaDetails: values.areaDetails,
        },
        restaurantId: "eabf4311-0451-4ff7-a2f7-f7718b6e0caf",
      });
    }

    // console.log({ mutation });
    formClose(false);
    // setMainArrayOfOpeningDetails(openingHoursDetails);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    // formClose(false);
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
              rules={[
                {
                  required: branchName === "" ? true : false,
                  message: "Please enter your branch name",
                },
              ]}
            >
              <Input
                className="text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                placeholder="Enter Branch Name"
                size="large"
                defaultValue={isInfoUpdate ? branchName : ""}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<FieldType>
              label={<Title level={5}>Is Available:</Title>}
              labelCol={{ span: 24 }}
              name="isAvailable"
              rules={[
                {
                  required: isAvailable === 0 ? true : false,
                  message: "Please input Contact Number!",
                },
              ]}
            >
              <Radio.Group
                onChange={handelResturentisAvailable}
                defaultValue={isInfoUpdate ? (isAvailable ? 1 : 2) : undefined}
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
              rules={[
                {
                  required: priceRangeValue === 0 ? true : false,
                  message: "Please input your Branch Name!",
                },
              ]}
            >
              <Radio.Group
                onChange={handelPriceRange}
                defaultValue={isInfoUpdate ? priceRangeValue : undefined}
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
              rules={[
                {
                  required: cuisineTypes.length === 0 ? true : false,
                  message: "Please input Contact Number!",
                },
              ]}
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
                defaultValue={isInfoUpdate ? cuisineTypes : undefined}
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
              rules={[
                {
                  required: areaDetails === "" ? true : false,
                  message: "Please input Contact Number!",
                },
              ]}
            >
              <Input
                className="text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
                placeholder="Enter Street Number"
                size="large"
                type="tel"
                defaultValue={isInfoUpdate ? areaDetails : undefined}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Division"
              name="divisionName"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: divisionName === "" ? true : false,
                  message: "Please input your Branch Name!",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Select a Division"
                onChange={handleDivisionChange}
                options={divisionData?.map((division: string) => ({
                  label: division,
                  value: division,
                }))}
                defaultValue={isInfoUpdate ? divisionName : undefined}
                allowClear
              ></Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<FieldType>
              label="District"
              labelCol={{ span: 24 }}
              name="districtName"
              rules={[
                {
                  required: districtName === "" ? true : false,
                  message: "Please input Contact Number!",
                },
              ]}
            >
              <Select
                placeholder="Select a District"
                onChange={handleDistrictChange}
                options={district?.map((data: any) => ({
                  label: data,
                  value: data,
                }))}
                defaultValue={isInfoUpdate ? districtName : undefined}
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
              rules={[
                {
                  required: thanaName === "" ? true : false,
                  message: "Please input your Branch Name!",
                },
              ]}
            >
              <Select
                placeholder="Select a Thana"
                size="large"
                options={thana?.map((data: string) => ({
                  label: data,
                  value: data,
                }))}
                defaultValue={isInfoUpdate ? thanaName : undefined}
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
