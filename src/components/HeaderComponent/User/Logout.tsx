import { LogoutSVG } from "../Icons/LogoutSVG";
import Link from "next/link";

export const Logout = () => {
  return (
    <div>
      <Link
        href={"/"}
        type="text"
        className="flex items-center w-48 py-3 mt-2 text-gray-600 fill-gray-600 hover:text-black hover:fill-blue-700 hover:bg-gray-100 active:bg-gray-200 transition rounded-lg"
      >
        <LogoutSVG />
        Logout
      </Link>
    </div>
  );
};
