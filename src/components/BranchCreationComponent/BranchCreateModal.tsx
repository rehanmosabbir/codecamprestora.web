// import React from "react";
// import { Button, Form, Input } from "antd";
// import Image from "next/image";
// import logo from "@/assets/logo.png";
// import { FieldType } from "@/types/BreanchCreationTypes";

// const BranchCreateModal = () => {
//   const onFinish = (values: any) => {
//     console.log("Success:", values);
//   };

//   const onFinishFailed = (errorInfo: any) => {
//     console.log("Failed:", errorInfo);
//   };
//   return (
//     <div>
//       <Form
//         requiredMark={true}
//         name="basic"
//         style={{ maxWidth: 600 }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//         className="bg-white !p-10"
//       >
//         <div className="flex justify-center mb-8">
//           <Image src={logo} width={100} height={100} alt="logo" priority />
//         </div>

//         <h1 className="p-3 text-[16px] font-semibold text-center mb-3">
//           Create New Branch
//         </h1>

//         <Form.Item<FieldType>
//           label="Branch Name:"
//           name="branchName"
//           labelCol={{ span: 24 }}
//           rules={[
//             { required: true, message: "Please input your Branch Name!" },
//           ]}
//         >
//           <Input
//             className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
//             placeholder="Enter Branch Name"
//             size="large"
//           />
//         </Form.Item>

//         <Form.Item<FieldType>
//           label="Contact Number:"
//           labelCol={{ span: 24 }}
//           name="contactNumber"
//           rules={[{ required: true, message: "Please input Contact Number!" }]}
//         >
//           <Input
//             className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
//             placeholder="Enter Contact Number"
//             size="large"
//             type="tel"
//           />
//         </Form.Item>

//         <Form.Item<FieldType>
//           label="Branch Address:"
//           labelCol={{ span: 24 }}
//           // name="branchAddress"
//           rules={[
//             { required: true, message: "Please input Branch's address!" },
//           ]}
//         >
//           <Input
//             className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1 "
//             placeholder="Enter Branch Address"
//             size="large"
//             type="text"
//           />
//         </Form.Item>

//         <Form.Item<FieldType>
//           label="Opening Hours:"
//           labelCol={{ span: 24 }}
//           name="openingHours"
//           rules={[{ required: true, message: "Please input Opening Hours!" }]}
//         >
//           <Input
//             className="!py-4 text-[16px] text-gray-600 hover:bg-slate-100 hover:ring-1"
//             placeholder="Enter Opening Hours"
//             size="large"
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button
//             className="!bg-purple-700 !text-white text-lg !h-12 font-semibold !hover:text-white"
//             htmlType="submit"
//             block
//           >
//             Create Branch
//           </Button>
//         </Form.Item>
//         <hr className="mb-3" />
//       </Form>
//     </div>
//   );
// };

// export default BranchCreateModal;
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
import { BranchInformationForm } from "./BranchInformationForm";

export const BranchCreateModal = () => {
  // const {
  //   branchName,
  //   isAvailable,
  //   priceRangeValue,
  //   openingHoursDetails,
  //   cuisineTypes,
  //   areaDetails,
  //   divisionName,
  //   districtName,
  //   thanaName,
  //   updateBranchName,
  //   updateIsAvailable,
  //   updateDivisionName,
  //   updateDistrictName,
  //   updateThanaName,
  //   updatePriceRangeValue,
  //   updateCuisineTypes,
  //   updateAreaDetails,
  //   setMainArrayOfOpeningDetails,
  // } = useBranchDetails();

  // const [district, setDistrict] = useState([] as any);
  // const [thana, setThana] = useState([] as any);

  // const handleDivisionChange = (value: string) => {
  //   // console.log("thanaaaaaa----------", value);
  //   setDistrict(districtData[value]);
  // };

  // const handleDistrictChange = (value: string) => {
  //   console.log("thanaaaaaa----------", value);
  //   setThana(thanaData[value]);
  // };

  // const handelPriceRange = (e: RadioChangeEvent) => {
  //   console.log("radio checked", e.target.value);
  // };

  // const handelResturentisAvailable = (e: RadioChangeEvent) => {
  //   console.log("radio checked", e.target.value);
  // };

  // const handleCusineType = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  // console.log("Branch Information Edit page--");

  // const onFinish = (values: any) => {
  //   console.log("Success:------", values);

  //   if (values.branchName !== undefined) updateBranchName(values.branchName);
  //   if (values.isAvailable !== undefined) updateIsAvailable(values.isAvailable);
  //   if (values.priceRangeValue !== undefined)
  //     updatePriceRangeValue(values.priceRangeValue);
  //   if (values.cuisineTypes !== undefined)
  //     updateCuisineTypes(values.cuisineTypes);
  //   if (values.areaDetails !== undefined) updateAreaDetails(values.areaDetails);
  //   if (values.divisionName !== undefined)
  //     updateDivisionName(values.divisionName);
  //   if (values.districtName !== undefined)
  //     updateDistrictName(values.districtName);
  //   if (values.thanaName !== undefined) updateThanaName(values.thanaName);

  //   setMainArrayOfOpeningDetails(openingHoursDetails);
  // };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };

  return (
    <div >
      <Title className="text-center" level={3}>Branch Information</Title>
      {/* <div className="flex justify-center mb-8">
        <Image src={logo} width={100} height={100} alt="logo" priority />
      </div> */}
      {/* <Card
        title={<Title level={4}>Branch Information</Title>}
        // className="grid col-span-2 justify-center"
        style={{ width: 900 }}
      > */}
      <div className="mt-10 ml-7"><BranchInformationForm></BranchInformationForm></div>
      {/* </Card> */}
    </div>
  );
};
