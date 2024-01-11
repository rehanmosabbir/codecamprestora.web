import React, { FC, FunctionComponent, useEffect, useState } from "react";
import { BranchInfoEdit } from "./BranchInfoEdit";
import { Button, Card, Col, Divider, Radio, Row, Table } from "antd";
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
  const [editInfo, setEditInfo] = useState(true);
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
  // const data = mainArrayOfOpeningDetails;
  console.log("BranchInformation page -->>");

  return editInfo ? (
    <div className=" flex justify-center">
      <div className="flex justify-center items-center">
        <div className="w-full m-10">
          <Card
            title={<Title level={4}>Branch Information</Title>}
            extra={
              <div>
                <Button
                  onClick={() => setEditInfo(false)}
                  className="bg-purple-700 font-medium hover:bg-purple-600 text-white"
                  type="primary"
                >
                  Edit
                </Button>
              </div>
            }
            style={{ width: 900 }}
          >
            <div className="grid gap-3 col-span-4">
              <Row gutter={40}>
                <Col span={12}>
                  <Title level={5}>Branch Name:</Title>
                  <p className="text-base">{branchName}</p>
                </Col>

                <Col span={12}>
                  <Title level={5}>Is Available:</Title>
                  {isAvailable === 1 ? <p>YES</p> : <p>NO</p>}
                </Col>
              </Row>

              <Row gutter={40}>
                <Col span={12}>
                  <Title level={5}>Price Range:</Title>
                  {getLabel(priceRangeValue)}
                </Col>

                <Col span={12}>
                  <Title level={5}>Cuisine Types:</Title>
                  <p className="text-base">
                    Chicken grill
                    {cuisineTypes.map((value: string) => ", " + value)}{" "}
                  </p>
                </Col>
              </Row>

              <Row gutter={40}>
                <Col>
                  <Title level={5}>Branch Address: </Title>
                  <p className="text-base">
                    {areaDetails}{" "}
                    {thanaName !== "" ? (
                      ", " +
                      thanaName +
                      ", " +
                      districtName +
                      ", " +
                      divisionName
                    ) : (
                      <></>
                    )}
                  </p>
                </Col>
              </Row>
              <div>
                <Meta title="Opening Hours:" />
                <Divider />
                <Table
                  columns={columns}
                  dataSource={mainArrayOfOpeningDetails}
                  pagination={{ hideOnSinglePage: true }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <div>
        <div className="w-full m-11">
          <BranchInfoEdit editInfoOff={setEditInfo} />
        </div>
      </div>
    </div>
  );
};
export default BranchInformation;
