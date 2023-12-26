import { signOut } from "next-auth/react";
import { LogoutSVG } from "../HeaderIcons/LogoutSVG";
import { useRouter } from "next/router";

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
          className="flex items-center w-56 py-3 mt-2 text-gray-600 fill-gray-600 hover:text-black hover:fill-blue-700 hover:bg-gray-100 active:bg-gray-200 transition rounded-lg"
        >
          <LogoutSVG />
          Logout
        </button>
      </form>
    </div>
  );
};
