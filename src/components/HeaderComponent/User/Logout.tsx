import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { IoLogOutOutline } from "react-icons/io5";

export const Logout = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signOut({ redirect: false });
    router.push("/login");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="flex items-center w-56 py-3 mt-2 hover:bg-gray-100 active:bg-gray-200 transition rounded-lg text-gray-600 hover:text-purple-800"
        >
          <div className="mx-4 text-xl">
            <IoLogOutOutline />
          </div>
          <div className="text-gray-700">Logout</div>
        </button>
      </form>
    </div>
  );
};
