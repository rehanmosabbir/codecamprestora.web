import axios from "axios";
import { useQuery } from "react-query";

const path = "/api/v1/MenuItem";

const MENU_CATEGORY: string = `http://54.203.205.46:5219/api/v1/MenuCategory/GetAll0080de5a-9ee5-4d7f-9c2a-73f28862bb7c`;
const MENU_ITEM: string = `http://54.203.205.46:5219/api/v1/MenuItem/Paginated?BranchId=5be5ac8c-8200-46b7-95a2-0c2cc0a1f671&PageNumber=1&PageSize=10`;

const getAllMenuCategories = async () => {
    const response = await axios.get(MENU_CATEGORY);
    return response.data;
}

const getAllMenuItems = async () => {
    const response = await axios.get(MENU_ITEM);
    return response.data;
}

export const useMenuCategory = () => {
    const query = useQuery({
        queryKey: ['menu-category'],
        queryFn: getAllMenuCategories
    });
    return query;
}

export const useMenuItem = () => {
    const query = useQuery({
        queryKey: ['menu-item'],
        queryFn: getAllMenuItems
    });
    return query;
}
