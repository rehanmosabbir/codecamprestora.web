import React, { useState } from "react";
import { BranchInfoEdit } from "./BranchInfoEdit";
import { Button, Card, Col, Divider, Flex, Row, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataType, openingClosingType } from "./types/BranchTypes";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useBranchDetails } from "./Zustand/Zustand";
import Title from "antd/es/typography/Title";
import axios from "axios";
import { useQuery } from "react-query";

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
    title: "Open",
    dataIndex: "IsOpen",
    align: "center",
    render: (value, record: DataType) =>
      record?.IsOpen === "true" ? (
        <div className="text-green-600">
          <CheckOutlined />
        </div>
      ) : (
        <div className="text-red-600">
          <CloseOutlined />
        </div>
      ),
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
    updateIsInfoUpdate,
    updateBranchName,
    updateIsAvailable,
    updateDivisionName,
    updateDistrictName,
    updateThanaName,
    updatePriceRangeValue,
    updateCuisineTypes,
    updateAreaDetails,
    setOpeningHoursDetails,
    updateRowSelectedArray,
  } = useBranchDetails();

  const { isError, data, error } = useQuery({
    queryKey: ["BranchInfo"],
    queryFn: async () => {
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/branch`,
      //   branchCreationInformation
      // );
      const response = await axios.get(
        `http://54.203.205.46:5219/api/v1/branch/c1922c17-0015-4c0e-be03-f611fb9e20a5`
      );
      // const response = await axios.get(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/branch/34162bfa-104e-46ec-acc4-a9baaf67a44d`
      // );
      // console.log({response});
      return response;
    },
  });

  const BranchDetailsData = data?.data?.data;
  console.log("hellllo", { BranchDetailsData });
  // BranchDetailsData?.openingClosingTimes?.filter((day:number) => console.log({day}) )
  //  const index = BranchDetailsData.openingClosingTimes.day
  const findOpeningHours = (index: number) => {
    const data: openingClosingType =
      BranchDetailsData?.openingClosingTimes?.find(
        (value: openingClosingType) => value.day === index
      );

    let time = parseInt(data?.openingHours, 10);
    // console.log({time});
    if (time > 12) {
      time = time % 12;
      // console.log("time check--");
      if (time < 10) {
        let timeString =
          "0" +
          time +
          data?.openingHours[2] +
          data?.openingHours[3] +
          data?.openingHours[4] +
          " PM";
        // console.log({ timeString });
        return timeString;
      } else {
        let timeString =
          "" +
          time +
          data?.openingHours[2] +
          data?.openingHours[3] +
          data?.openingHours[4] +
          " PM";
        // console.log({ timeString });
        return timeString;
      }
    } else return data?.openingHours + " AM";
  };

  const findClosingHours = (index: number) => {
    const data: openingClosingType =
      BranchDetailsData?.openingClosingTimes?.find(
        (value: openingClosingType) => value.day === index
      );
    let time = parseInt(data?.closingHours, 10);
    // console.log({ time });
    if (time > 12) {
      time = time % 12;
      // console.log("time check--");
      if (time < 10) {
        let timeString =
          "0" +
          time +
          data?.closingHours[2] +
          data?.closingHours[3] +
          data?.closingHours[4] +
          " PM";
        // console.log({ timeString });
        return timeString;
      } else {
        let timeString =
          "" +
          time +
          data?.closingHours[2] +
          data?.closingHours[3] +
          data?.closingHours[4] +
          " PM";
        // console.log({ timeString });
        return timeString;
      }
    } else return data?.closingHours + " AM";

    // console.log(data[0]?.openingHours );
  };
  const findIsOpen = (index: number) => {
    const data: openingClosingType =
      BranchDetailsData?.openingClosingTimes?.find(
        (value: openingClosingType) => value.day === index
      );

    // console.log("fdf- ", data?.isClosed);
    return data?.isClosed;
  };

  const arrayOfOpeningDetails: DataType[] = [
    {
      key: "1",
      Days: "Saturday",
      OpeningHours: findOpeningHours(0),
      ClosingHours: findClosingHours(0),
      IsOpen: findIsOpen(0) ? "false" : "true",
      // enabled: false,
    },
    {
      key: "2",
      Days: "Sunday",
      OpeningHours: findOpeningHours(1),
      ClosingHours: findClosingHours(1),
      IsOpen: findIsOpen(1) ? "false" : "true",
      // enabled: true,
    },
    {
      key: "3",
      Days: "Monday",
      OpeningHours: findOpeningHours(2),
      ClosingHours: findClosingHours(2),
      IsOpen: findIsOpen(2) ? "false" : "true",
      // enabled: true,
    },
    {
      key: "4",
      Days: "Tuesday",
      OpeningHours: findOpeningHours(3),
      ClosingHours: findClosingHours(3),
      IsOpen: findIsOpen(3) ? "false" : "true",
      // enabled: true,
    },
    {
      key: "5",
      Days: "Wednesday",
      OpeningHours: findOpeningHours(4),
      ClosingHours: findClosingHours(4),
      IsOpen: findIsOpen(4) ? "false" : "true",
      // enabled: true,
    },
    {
      key: "6",
      Days: "Thursday",
      OpeningHours: findOpeningHours(5),
      ClosingHours: findClosingHours(5),
      IsOpen: findIsOpen(5) ? "false" : "true",
      // enabled: true,
    },
    {
      key: "7",
      Days: "Friday",
      OpeningHours: findOpeningHours(6),
      ClosingHours: findClosingHours(6),
      IsOpen: findIsOpen(6) ? "false" : "true",
      // enabled: true,
    },
  ];
  console.log({ arrayOfOpeningDetails });
  console.log("BranchInformation page -->>");

  const handelEditButton = () => {
    setEditInfo(true);
    updateIsInfoUpdate(true);

    // if (values.branchName !== undefined)
    updateBranchName(BranchDetailsData?.name);
    // if (values.isAvailable !== undefined)
    updateIsAvailable(BranchDetailsData?.isAvailable);
    // if (values.priceRangeValue !== undefined)
    updatePriceRangeValue(BranchDetailsData?.priceRange);

    // if (values.cuisineTypes !== undefined)
    const convertedCuisineTypes = BranchDetailsData?.cuisineTypes?.map(
      (value: { cuisineTag: string }) => value?.cuisineTag
    );
    console.log({ convertedCuisineTypes });
    updateCuisineTypes(convertedCuisineTypes);
    // if (values.areaDetails !== undefined)

    updateAreaDetails(BranchDetailsData?.address?.areaDetails);
    // if (values.divisionName !== undefined)
    updateDivisionName(BranchDetailsData?.address?.division);
    // if (values.districtName !== undefined)
    updateDistrictName(BranchDetailsData?.address?.district);
    // if (values.thanaName !== undefined)
    updateThanaName(BranchDetailsData?.address?.thana);
    setOpeningHoursDetails(arrayOfOpeningDetails);

    let rowSelected: string[] = [];
    arrayOfOpeningDetails.forEach((values) => {
      if (values.IsOpen === "true") rowSelected.push(values.key);
    });

    updateRowSelectedArray(rowSelected);
    console.log("edir--", rowSelected);
    // setMainArrayOfOpeningDetails(arrayOfOpeningDetails)
  };

  if (!BranchDetailsData)
    return (
      <div className=" m-20 p-20">
        <Spin tip="Loading...">
          <div className="content" />
        </Spin>
      </div>
    );
  return !editInfo ? (
    <div className="w-full">
      <div className="flex justify-between bg-white font-[500] text-lg pt-4 pl-4 pr-4 pb-3 rounded-lg">
        <Title level={4}>Branch Information</Title>
        <Button
          onClick={() => handelEditButton()}
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
              <p className="text-base">{BranchDetailsData?.name}</p>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col span={6}>
              <label className="font-semibold	">Available</label>
            </Col>
            <Col span={2}>:</Col>
            <Col span={16}>
              {BranchDetailsData?.isAvailable === true ? <p>YES</p> : <p>NO</p>}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col span={6}>
              <label className="font-semibold	">Price Range</label>
            </Col>
            <Col span={2}>:</Col>
            <Col span={16}>{getLabel(BranchDetailsData?.priceRange)}</Col>
          </Row>
          <Row className="mb-2">
            <Col span={6}>
              <label className="font-semibold	">Cuisine Types</label>
            </Col>
            <Col span={2}>:</Col>
            <Col span={16}>
              <p className="text-base">
                Chicken grill
                {BranchDetailsData?.cuisineTypes?.map(
                  (value: { cuisineTag: string }) => ", " + value.cuisineTag
                )}
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
                {BranchDetailsData?.address?.areaDetails}
                {BranchDetailsData?.address?.thana !== "" ? (
                  ", " +
                  BranchDetailsData?.address?.thana +
                  ", " +
                  BranchDetailsData?.address?.district +
                  ", " +
                  BranchDetailsData?.address?.division
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
              dataSource={arrayOfOpeningDetails}
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
