import axios from "axios";

export const path = "/api/v1/Orders";
export const pageSizes = 10;
export const pageNumber = 1;
export const pageSize = 10;
export const branchId = "453ff5e7-6c71-473f-ac4c-c5770d215ecd";

export const getAll = async () => {
    const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}${path}?branchId=${branchId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

}

