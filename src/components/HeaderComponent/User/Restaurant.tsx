import Link from "next/link";
import { RiRestaurant2Line } from "react-icons/ri";

export const Restaurant = () => {
  return (
    <div>
      <Link
        href={"/dashboard/restaurant-settings/"}
        type="text"
        className="flex items-center w-56 py-3 mt-2 hover:bg-gray-100 active:bg-gray-200 transition rounded-lg text-gray-600 hover:text-purple-800"
      >
        <div className="mx-4 text-xl">
          <RiRestaurant2Line />
        </div>
        <div className="text-gray-700">Restaurant Settings</div>
      </Link>
    </div>
  );
};
