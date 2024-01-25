import RestaurantUsersList from "@/components/RestaurantUsersList/RestaurantUsersList";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  return (
    <main>
      User Logged in : {JSON.stringify(data)}
      <h2 className="text-3xl font-bold text-center pt-[40vh] pb-[40vh]">
        Welcome to Restora.App
        <RestaurantUsersList></RestaurantUsersList>
      </h2>
    </main>
  );
}
