import Link from "next/link";
import { LuUser } from "react-icons/lu";

export const Account = () => {
  return (
    <div>
      <Link
        href={"/"}
        type="text"
        className="flex items-center w-56 py-3 mt-2 hover:bg-gray-100 active:bg-gray-200 transition rounded-lg text-gray-600 hover:text-purple-800"
      >
        <div className="mx-4 text-xl">
          <LuUser />
        </div>
        <div className="text-gray-700">Account Settings</div>
      </Link>
    </div>
  );
};
