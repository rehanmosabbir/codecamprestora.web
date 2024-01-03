import { BranchInfo } from "@/components/BranchCreationComponent/BranchInformation";
import React from "react";

const BranchInformation = () => {
  console.log("route page of branch-->>");
  return (
    <div className="bg-gray-100 rounded-lg">
      <BranchInfo />
    </div>
  );
};

export default BranchInformation;
