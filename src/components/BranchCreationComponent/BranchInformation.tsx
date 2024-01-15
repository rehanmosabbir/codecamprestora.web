import React, { useState } from "react";
import { BranchInfoEdit } from "./BranchInfoEdit";
import { Button, Card, Col, Divider, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataType } from "./types/BranchTypes";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useBranchDetails } from "./Zustand/Zustand";
import Title from "antd/es/typography/Title";

const columns: ColumnsType<DataType> = [
  {
    title: "Days",
    dataIndex: "Days",
    align: "center",
  },
  {
    title: "Opening Hours",
    dataIndex: "OpeningHours",
    align: "center",
  },
  {
    title: "Closing Hours",
    dataIndex: "ClosingHours",
    align: "center",
  },
  {
    title: "Is Open",
    dataIndex: "IsOpen",
    align: "center",
    render: (value, record: DataType) =>
      record?.IsOpen === "true" ? <CheckOutlined /> : <CloseOutlined />,
  },
];

const getLabel = (priceRange: number) => {
  if (priceRange == 1) return "Low";
  if (priceRange == 2) return "Medium";

  return "High";
};

export const BranchInformation = () => {
  const [editInfo, setEditInfo] = useState(false);
  const {
    branchName,
    isAvailable,
    priceRangeValue,
    cuisineTypes,
    areaDetails,
    divisionName,
    districtName,
    thanaName,
    mainArrayOfOpeningDetails,
  } = useBranchDetails();
  // console.log("BranchInformation page -->>");

  return !editInfo ? (
    <div className="w-full">
      <div className="flex justify-between bg-white font-[500] text-lg pt-4 pl-4 pr-4 pb-3 rounded-lg">
        <Title level={4}>Branch Information</Title>
        <Button
          onClick={() => setEditInfo(true)}
          className="bg-purple-700 font-medium hover:bg-purple-600 text-white"
          type="primary"
        >
          Edit
        </Button>
      </div>

      <div>
        <div className="mt-[0.05rem] bg-white p-5 rounded-t-lg">
          <Row className="mb-2">
            <Col span={6}>
              <label className="font-semibold	">Branch Name</label>
            </Col>
            <Col span={2}>:</Col>
            <Col span={16}>
              <p className="text-base">{branchName}</p>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col span={6}>
              <label className="font-semibold	">Is Available</label>
            </Col>
            <Col span={2}>:</Col>
            <Col span={16}>{isAvailable === 1 ? <p>YES</p> : <p>NO</p>}</Col>
          </Row>
          <Row className="mb-2">
            <Col span={6}>
              <label className="font-semibold	">Price Range</label>
            </Col>
            <Col span={2}>:</Col>
            <Col span={16}>{getLabel(priceRangeValue)}</Col>
          </Row>
          <Row className="mb-2">
            <Col span={6}>
              <label className="font-semibold	">Cuisine Types</label>
            </Col>
            <Col span={2}>:</Col>
            <Col span={16}>
              <p className="text-base">
                Chicken grill
                {cuisineTypes.map((value: string) => ", " + value)}{" "}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <label className="font-semibold	">Branch Address</label>
            </Col>
            <Col span={2}>:</Col>
            <Col span={16}>
              <p className="text-base">
                {areaDetails}{" "}
                {thanaName !== "" ? (
                  ", " + thanaName + ", " + districtName + ", " + divisionName
                ) : (
                  <></>
                )}
              </p>
            </Col>
          </Row>
        </div>
        <div className=" bg-white pb-5 pl-5 pr-5">
          <label className="font-semibold	">Opening Hours:</label>
          <Divider />
          <div>
            <Table
              scroll={{ x: 400 }}
              columns={columns}
              dataSource={mainArrayOfOpeningDetails}
              pagination={{ hideOnSinglePage: true }}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full">
      <BranchInfoEdit formClose={setEditInfo} />
    </div>
  );
};
export default BranchInformation;
