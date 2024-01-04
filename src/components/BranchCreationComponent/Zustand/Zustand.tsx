import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { create } from "zustand";
import { DataType } from "../types/BranchTypes";

type BranchDetailsType = {
  branchName: string;
  contactNumber: string;
  branchAddress: string;
  openingHoursDetails: any[];
  rowSelectedArray: string[];
  mainArrayOfOpeningDetails:any [],
  updateRowSelectedArray:(rowSelectedArray: string[]) => void;
  updateBranchName: (branchName: string) => void;
  updateContactNumber: (contactNumber: string) => void;
  updateBranchAddress: (branchAddress: string) => void;
  updateOpeningHoursDetails: (key:string, data:string,keyField:string) =>void;
  setMainArrayOfOpeningDetails:(openingHoursDetails:any[]) => void
};

export const useBranchDetails = create<BranchDetailsType>((set) => ({
  branchName: "Shymoli",
  contactNumber: "12345678",
  branchAddress: "Shymoli, Dhaka",

  rowSelectedArray: ["1", "2", "3", "4", "5", "6", "7"],
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

  updateBranchName: (branchName: string) =>
    set((state) => ({ branchName: branchName })),
  updateContactNumber: (contactNumber) =>
    set(() => ({ contactNumber: contactNumber })),
  updateBranchAddress: (branchAddress) =>
    set(() => ({ branchAddress: branchAddress })),

  setMainArrayOfOpeningDetails: (mainArrayOfOpeningDetails) =>
    set((state) => {
      // var prev = mainArrayOfOpeningDetails;
      // var next = [...mainArrayOfOpeningDetails];
      // console.log(prev === next);

      var s = { mainArrayOfOpeningDetails: mainArrayOfOpeningDetails.map(x=> ({...x})) };
      // console.log('this one', state);

      return s;
    }),

  updateOpeningHoursDetails: (key, data, keyField) =>
    set((state) => ({
      openingHoursDetails: state.openingHoursDetails.map((item, index) => {
        //  item.key === key ? { ...item, ...data } : item
        console.log("item", item);
        if (item?.key == key) {
          if (keyField == "OpeningHours") item.OpeningHours = data;
          else if (keyField == "ClosingHours") item.ClosingHours = data;
          else if (keyField == "IsOpen") item.IsOpen = data;

          return item;
        } else return item;
      }),
    })),
}));
