import React, { useState } from "react";
import { BranchInfoEdit } from "./BranchInfoEdit";
import { Button, Card, Col, Divider, Row, Table } from "antd";
import Meta from "antd/es/card/Meta";
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
  console.log("BranchInformation page -->>");

  return !editInfo ? (
    <div className="w-full">
      <Card
        title={<Title level={4}>Branch Information</Title>}
        extra={
          <Button
            onClick={() => setEditInfo(true)}
            className="bg-purple-700 font-medium hover:bg-purple-600 text-white"
            type="primary"
          >
            Edit
          </Button>
        }
      >
        <div>
          <div>
            <Row className='mb-2'>
              <Col span={6}>
                <Meta title="Branch Name" />
              </Col>
              <Col span={2}>:</Col>
              <Col span={16}>
                <p className="text-base">{branchName}</p>
              </Col>
            </Row>
            <Row className='mb-2'>
              <Col span={6}>
                <Meta title="Is Available:" />
              </Col>
              <Col span={2}>:</Col>
              <Col span={16}>{isAvailable === 1 ? <p>YES</p> : <p>NO</p>}</Col>
            </Row>
            <Row className='mb-2'>
              <Col span={6}>
                <Meta title="Price Range" />
              </Col>
              <Col span={2}>:</Col>
              <Col span={16}>{getLabel(priceRangeValue)}</Col>
            </Row>
            <Row className='mb-2'>
              <Col span={6}>
                <Meta title="Cuisine Types:" />
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
                <Meta title="Branch Address:" />
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

          {/* <Row></Row>
          <Row></Row>
          <Row></Row>
          <Row></Row> */}
          <div className='mt-10'>
            <Meta title="Opening Hours:" />
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
      </Card>
    </div>
  ) : (
    <div className="w-full">
      <BranchInfoEdit formClose={setEditInfo} />
    </div>
  );
};
export default BranchInformation;
