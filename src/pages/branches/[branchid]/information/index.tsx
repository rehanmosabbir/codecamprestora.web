import { BranchInformation } from "@/components/BranchCreationComponent/BranchInformation";
import React from "react";

const BranchInformationRoute = () => {
  console.log("route page of branch-->>");
  return (
    <div className="bg-gray-100 rounded-lg">
      <BranchInformation />
    </div>
  );
};

export default BranchInformationRoute;
