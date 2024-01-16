import axios from "axios";

const path = "/api/v1/branch";

export const getAll = async (restaurantId: string) => {
    var result = await axios.get(`${process.env.BASE_URL}${path}/restaurant/${restaurantId}`);
}