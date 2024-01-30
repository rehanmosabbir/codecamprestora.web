import { useState } from "react";
import { Space, Table, Popover, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GoGear } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import Link from "next/link";
import { BranchCreation } from "../BranchCreationComponent/BranchCreation";
import axios from "axios";
import { useQuery, QueryClient, useMutation } from "react-query";
interface DataType {
  id: string;
  name: string;
  isAvailable: boolean;
}
export const BranchList = () => {
  const queryClient = new QueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["branchlist", 1],
    queryFn: async () => {
      const response = await axios.get(
        `http://54.203.205.46:5219/api/v1/branch/resturant/34aaecb9-ecd1-4cc3-989f-50a6762844e0?pageNumber=1&pageSize=10`
      );
      console.log("api Response:", response);
      return response.data;
    },
  });

  console.log("data", data);

  if (isLoading) return <div>Fetching posts...</div>;
  if (error) return <div>An error occurred:</div>;

  // const mutation = useMutation({
  //   mutationFn: async (id: string) => {
  //     const response = await axios.put(
  //       `http://54.203.205.46:5219/api/v1/branch/${id}`
  //     );
  //     return response;
  //   },
  // });
  // const handleToggle = (id: string) => {
  //   try {
  //     const branchToToggle = data.data.find((branch: any) => branch.id === id);

  //     if (branchToToggle) {
  //       branchToToggle.isAvailable = !branchToToggle.isAvailable;

  //       mutation.mutate(id);
  //     }
  //   } catch (error) {
  //     console.error("Error toggling branch status:", error);
  //   }
  // };
  const handleDelete = async (idToDelete: string) => {
    try {
      await axios.delete(
        `http://54.203.205.46:5219/api/v1/branch/${idToDelete}`
      );
      queryClient.invalidateQueries(["branchlist", 1]);
      refetch();
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await axios.put(`http://54.203.205.46:5219/api/v1/branch/${id}`);
      queryClient.invalidateQueries(["branchlist", 1]);
      refetch();
    } catch (error) {
      console.error("Error toggling branch status:", error);
    }
  };

  // const handleDelete = (keyToDelete: string) => {
  //   const updatedData = data.filter((item) => item.key !== keyToDelete);
  //   setData(updatedData);
  // };

  // const handleToggle = (key: string) => {
  //   const updatedData = data.map((item) => {
  //     if (item.key === key) {
  //       return {
  //         ...item,
  //         status: item.status === "Enable" ? "Disable" : "Enable",
  //       };
  //     }
  //     return item;
  //   });
  //   setData(updatedData);
  // };
  const content = (record: DataType) => (
    <div className="border-t-[1px] border-gray-200">
      <div className="m-2 flex justify-evenly">
        <button onClick={() => handleToggle(record.id)}>
          {record.isAvailable === true ? (
            <button className="bg-red-500 hover:bg-red-400 active:bg-red-500 px-2 py-1 rounded text-white transition">
              <div className="flex items-center">
                <AiTwotoneCloseCircle /> Disable
              </div>
            </button>
          ) : (
            <button className="bg-green-500 hover:bg-green-400 active:bg-green-500 px-2 py-1 rounded text-white transition">
              <div className="flex items-center">
                <AiTwotoneCheckCircle /> Enable
              </div>
            </button>
          )}
        </button>
        <Popconfirm
          title={"Sure to Delete?"}
          onConfirm={() => handleDelete(record.id)}
        >
          <button className="bg-red-500 hover:bg-red-500 active:bg-red-500 px-2 py-1 rounded text-white transition">
            <div className="flex items-center">
              <MdDelete />
              Delete
            </div>
          </button>
        </Popconfirm>
      </div>
    </div>
  );

  const columns: ColumnsType<DataType> = [
    {
      title: "Branch Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <Link href={`/branches/${record.id}/info`}>{name}</Link>
      ),
    },
    {
      title: "Restaurant Status",
      dataIndex: "isAvailable",
      key: "isAvailable",
      render: (isAvailable) => (
        <span>{isAvailable ? "enable" : "disable"}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popover
            content={content(record)}
            placement="right"
            title="Action"
            // trigger="click"
          >
            <Button type="primary" className="text-white">
              <GoGear />
            </Button>
          </Popover>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between bg-white p-5 rounded-lg">
        <h2 className="  font-[500] text-lg ">
          <span className="sm:inline-block hidden">Restaurant</span> Branch List
        </h2>
        <BranchCreation />
      </div>
      <Table
        bordered
        scroll={{ x: 400 }}
        columns={columns}
        dataSource={data?.data}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};
