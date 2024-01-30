import axios from "axios";

const path = "/api/v1/branch";
const restaurantId = "eabf4311-0451-4ff7-a2f7-f7718b6e0caf";

export const getAll = async (restaurantId: string) => {
  const response = await axios.get(
    `${process.env.BASE_URL}${path}/restaurant/${restaurantId}`
  );
  console.log("api Response:", response.data);
  return response.data;
};
