import axios from "axios";
import { useMutation, useQuery } from "react-query";

const path = "/api/v1/menuItemCategory";

const branchId = `d5bfb095-3aef-4bf8-b941-9735136f8a34`;
const beginPage = 1;
const endPage = 10;

const MENU_CATEGORY = `http://54.203.205.46:5219/api/v1/MenuCategory/GetAll34aaecb9-ecd1-4cc3-989f-50a6762844e0`;
const MENU_ITEM = `http://54.203.205.46:5219/api/v1/MenuItem/Paginated?BranchId=db27b5db-c55c-4be2-aed3-55e6a2c5ed59&PageNumber=1&PageSize=10`;

const menuCategory = async () => {
    const data = axios.get(MENU_CATEGORY);
    return data;
}

const menuItem = async () => {
    const data = axios.get(MENU_ITEM);
    return data;
}

export const getAllMenuCategory = () => {
    const query = useQuery({
        queryKey: ['menu-category'],
        queryFn: menuCategory
    });

    return query;
}

export const getAllMenuItem = () => {
    const query = useQuery({
        queryKey: ['menu-item'],
        queryFn: menuItem
    });

    return query;
}

const updateMenuItem = async (updatedMenuItemData: any) => {
    const response = await axios.put(`http://54.203.205.46:5219/api/v1/MenuItem/${updatedMenuItemData.id}`, updatedMenuItemData);
    return response.data;
};

export const useUpdateMenuItem = () => {
    return useMutation(updateMenuItem);
};

const deleteMenuItem = async (itemId: string) => {
    const response = await axios.delete(`http://54.203.205.46:5219/api/v1/MenuItem/${itemId}`);
    return response.data;
};

export const useDeleteMenuItem = () => {
    return useMutation(deleteMenuItem);
};
