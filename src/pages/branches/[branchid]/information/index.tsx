import { BranchInfo } from "@/components/BranchCreationComponent/BranchInformation";
import React from "react";

const BranchInformation = () => {
  console.log('route page of branch-->>');
  return (
    <div className="bg-gray-100 rounded-lg">
      <BranchInfo />
    </div>
  );
};

export default BranchInformation;
// import React from "react";
// import ReactDOM from "react-dom";
// import { Table } from "antd";

// function BranchInformation() {
//   const dataSource = [
//     {
//       key: "1",
//       name: "Mike",
//       age: 32,
//       address: "10 Downing Street",
//       enabled: true
//     },
//     {
//       key: "2",
//       name: "John",
//       age: 42,
//       address: "10 Downing Street",
//       enabled: false
//     }
//   ];

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name"
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age"
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address"
//     }
//   ];
//   return (
//     <>
//       <Table
//         dataSource={dataSource}
//         columns={columns}
//         rowClassName={record => !record.enabled && "disabled-row"}
//       />
//       ;
//     </>
//   );
// }

// export default BranchInformation;
