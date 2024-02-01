import { useState } from "react";
import { Space, Table, Popover, Button, Popconfirm, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GoGear } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import Link from "next/link";
import { BranchCreation } from "../BranchCreationComponent/BranchCreation";
import axios from "axios";
import { useQuery, QueryClient, useMutation } from "react-query";
import { useSession } from "next-auth/react";
interface DataType {
  id: string;
  name: string;
  isAvailable: boolean;
}
export const BranchList = () => {
  const path = "/api/v1/branch/";
  const pageSizes = 10;
  const [pageParameter, setPageParameter] = useState(1);
  const { data: session } = useSession();
  const restaurantId = session?.user?.restaurantId;
  const queryClient = new QueryClient();

  const {
    data: apiResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["branch-list", 1],
    queryFn: async ({ queryKey }) => {
      const pageNumber =
        (queryKey[1] as { pageParameter?: number })?.pageParameter || 1;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}${path}resturant/${restaurantId}?pageNumber=${pageNumber}&pageSize=${pageSizes}`
      );
      return response.data;
    },
    staleTime: 10000,
  });

  const toggleAvailabilityMutation = useMutation(
    ({ id, newStatus }: { id: string; newStatus: boolean }) =>
      axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
        id: id,
        isAvailable: newStatus,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["branchlist", 1]);
        refetch();
      },
    }
  );
  if (isLoading)
    return (
      <div className=" m-20 p-20">
        <Spin tip="Loading...">
          <div className="content" />
        </Spin>
      </div>
    );
  if (error) return <div>An error occurred:</div>;

  const dataSource = apiResponse?.data;

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      console.log("Toggle Params: ", id, currentStatus);
      const newStatus = !currentStatus;
      console.log("New Status: ", newStatus);
      await toggleAvailabilityMutation.mutateAsync({ id, newStatus });
    } catch (error) {
      console.error("Error toggling branch status:", error);
    }
  };
  const handleDelete = async (idToDelete: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}${path}${idToDelete}`
      );
      queryClient.invalidateQueries(["branchlist", 1]);
      refetch();
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };
  const content = (record: DataType) => (
    <div className="border-t-[1px] border-gray-200">
      <div className="m-2 flex justify-evenly">
        <button
          onClick={() => toggleAvailability(record.id, record.isAvailable)}
        >
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

  const tablePagination = {
    total: apiResponse?.totalPages * 10,
    onChange: async (page: number) => {
      setPageParameter(page);
      await refetch();
    },
    pageSize: 10,
  };

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
        dataSource={apiResponse?.data?.data}
        style={{ borderRadius: 0 }}
        pagination={tablePagination}
      />
    </div>
  );
};
