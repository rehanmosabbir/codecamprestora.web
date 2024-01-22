import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { create } from "zustand";
import { DataType } from "../types/BranchTypes";

type BranchDetailsType = {
  branchName: string;
  isAvailable: number;
  priceRangeValue: number;
  areaDetails: string;
  divisionName: string;
  districtName: string;
  thanaName: string;
  cuisineTypes: { cuisineTag: string}[];
  openingHoursDetails: any[];
  rowSelectedArray: string[];
  mainArrayOfOpeningDetails: any[];
  updateBranchName: (branchName: string) => void;
  updateRowSelectedArray: (rowSelectedArray: string[]) => void;
  updateDivisionName: (divisionName: string) => void;
  updateDistrictName: (districtName: string) => void;
  updateThanaName: (ThanaName: string) => void;
  updateIsAvailable: (isAvailable: number) => void;
  updatePriceRangeValue: (priceRangeValue: number) => void;
  updateCuisineTypes: (cuisineTypes: { cuisineTag: string}[]) => void;
  updateAreaDetails: (areaDetails: string) => void;
  updateOpeningHoursDetails: (
    key: string,
    data: string| boolean,
    keyField: string
  ) => void;
  setMainArrayOfOpeningDetails: (openingHoursDetails: any[]) => void;
};

export const useBranchDetails = create<BranchDetailsType>((set) => ({
  branchName: "",
  isAvailable: 0,
  priceRangeValue: 0,
  cuisineTypes: [{
    cuisineTag: "biriyani"
},{
  cuisineTag: "biriyani"
}],
  areaDetails: "",
  divisionName: "",
  districtName: "",
  thanaName: "",
  rowSelectedArray: ["1", "2", "3", "4", "5", "6", "7"],

  updateBranchName: (branchName: string) =>
    set((state) => ({ branchName: branchName })),
  updateIsAvailable: (isAvailable) => set(() => ({ isAvailable: isAvailable })),
  updatePriceRangeValue: (priceRangeValue: number) =>
    set(() => ({ priceRangeValue: priceRangeValue })),
  updateAreaDetails: (areaDetails: string) =>
    set(() => ({ areaDetails: areaDetails })),
  updateCuisineTypes: (cuisineTypes: { cuisineTag: string}[]) =>
    set(() => ({ cuisineTypes: cuisineTypes })),
  updateDivisionName: (divisionName: string) =>
    set(() => ({ divisionName: divisionName })),
  updateDistrictName: (districtName: string) =>
    set(() => ({ districtName: districtName })),
  updateThanaName: (thanaName: string) => set(() => ({ thanaName: thanaName })),
  updateRowSelectedArray: (rowSelectedArray) =>
    set(() => ({ rowSelectedArray: rowSelectedArray })),

  mainArrayOfOpeningDetails: [
    {
      key: "1",
      day: "Saturday",
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: false,
    },
    {
      key: "2",
      day: "Sunday",
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: true,
    },
    {
      key: "3",
      day: "Monday",
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: true,
    },
    {
      key: "4",
      day: "Tuesday",
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: true,
    },
    {
      key: "5",
      day: "Wednesday",
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: true,
    },
    {
      key: "6",
      day: "Thursday",
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: true,
    },
    {
      key: "7",
      day: "Friday",
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: true,
    },
  ]  as DataType[],

  openingHoursDetails: [
    {
      // key: "1",
      day: 0,
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: false,
    },
    {
      // key: "2",
      day: 1,
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: true,
    },
    {
      // key: "3",
      day: 2,
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: true,
    },
    {
      // key: "4",
      day: 3,
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: true,
    },
    {
      // key: "5",
      day: 4,
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: true,
    },
    {
      // key: "6",
      day: 5,
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: true,
    },
    {
      // key: "7",
      day: 6,
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      isClosed: true,
      // enabled: true,
    },
  ] as DataType[],

  setMainArrayOfOpeningDetails: (mainArrayOfOpeningDetails) =>
    set((state) => {
      var data = {
        mainArrayOfOpeningDetails: mainArrayOfOpeningDetails.map((x) => ({
          ...x,
        })),
      };
      return data;
    }),

  updateOpeningHoursDetails: (key, data, keyField) =>
    set((state) => ({
      openingHoursDetails: state.openingHoursDetails.map((item, index) => {
        // console.log("item", item);
        if (item?.key == key) {
          if (keyField == "openingHours") item.OpeningHours = data;
          else if (keyField == "closingHours") item.ClosingHours = data;
          else if (keyField == "isClosed") item.IsOpen = data;

          return item;
        } else return item;
      }),
    })),
}));
