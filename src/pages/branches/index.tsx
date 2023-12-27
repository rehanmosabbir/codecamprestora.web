import React from "react";
import { BranchList } from "./../../components/BranchListComponent/BranchList";

const index = () => {
  return (
    <div className="sm:px-5 px-3">
      <div className="bg-gray-100 rounded-lg">
        <BranchList />
      </div>
    </div>
  );
};

export default index;
