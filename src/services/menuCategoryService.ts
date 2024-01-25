import { DataType } from "@/components/RestaurantCategoryComponent/Types/CategoryTypes";
import axios from "axios";
import { useQuery } from "react-query";

export const path = "/api/v1/MenuCategory";
export const restaurantId = "eabf4311-0451-4ff7-a2f7-f7718b6e0caf";
export const pageSizes = 10;

export const getById = async () => {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${path}/${restaurantId}`);
    console.log("API Response:", result.data);
    return result.data;
}

export const deleteById = async () => {
    const result = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}${path}/${restaurantId}`);
    console.log("API Response:", result.data);
    return result.data;
}

export const getAllByPaginated = async (pageNumber: number, pageSize: number) => {
    const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}${path}/Paginated?RestaurantId=${restaurantId}&PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
    return result.data.data;
};

export const useGetAllByPaginated = (pageNumber: number, pageSize: number) => {
    return useQuery(['menu-category', pageNumber, pageSize], () => getAllByPaginated(pageNumber, pageSize));
};

export const updateDisplayOrder = async (data: DataType[]) => {
    const dataToSend = data.map(({ id, displayOrder }) => ({ id, displayOrder }));
    console.log('Request Payload:', dataToSend);

    await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}${path}/UpdateDisplayOrder`,
        dataToSend
    );

    console.log('Display order updated successfully');
};