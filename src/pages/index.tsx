import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  return (
    <main className="bg-gray-100">
      User Logged in : {JSON.stringify(data)}
      <h2 className="text-3xl font-bold text-center pt-[40vh] pb-[40vh]">
        Welcome to Restora.App
      </h2>
    </main>
  );
}
