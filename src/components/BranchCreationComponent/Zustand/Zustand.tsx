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
  cuisineTypes: string[];
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
  updateCuisineTypes: (cuisineTypes: string[]) => void;
  updateAreaDetails: (areaDetails: string) => void;
  updateOpeningHoursDetails: (
    key: string,
    data: string,
    keyField: string
  ) => void;
  setMainArrayOfOpeningDetails: (openingHoursDetails: any[]) => void;
};

export const useBranchDetails = create<BranchDetailsType>((set) => ({
  branchName: "Shymoli",
  isAvailable: 1,
  priceRangeValue: 2,
  cuisineTypes: ["Biriyani", "Shorma"],
  areaDetails: "Shymoli",
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
  updateCuisineTypes: (cuisineTypes: string[]) =>
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
      Days: "Saturday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: false,
    },
    {
      key: "2",
      Days: "Sunday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: true,
    },
    {
      key: "3",
      Days: "Monday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: true,
    },
    {
      key: "4",
      Days: "Tuesday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: true,
    },
    {
      key: "5",
      Days: "Wednesday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: true,
    },
    {
      key: "6",
      Days: "Thursday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: true,
    },
    {
      key: "7",
      Days: "Friday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: true,
    },
  ] as DataType[],

  openingHoursDetails: [
    {
      key: "1",
      Days: "Saturday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: false,
    },
    {
      key: "2",
      Days: "Sunday",
      openingHours: "10:00 AM",
      closingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: true,
    },
    {
      key: "3",
      Days: "Monday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: true,
    },
    {
      key: "4",
      Days: "Tuesday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: true,
    },
    {
      key: "5",
      Days: "Wednesday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: true,
    },
    {
      key: "6",
      Days: "Thursday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
      // enabled: true,
    },
    {
      key: "7",
      Days: "Friday",
      OpeningHours: "10:00 AM",
      ClosingHours: "10:00 PM",
      IsOpen: "true",
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
          if (keyField == "OpeningHours") item.OpeningHours = data;
          else if (keyField == "ClosingHours") item.ClosingHours = data;
          else if (keyField == "IsOpen") item.IsOpen = data;

          return item;
        } else return item;
      }),
    })),
}));
