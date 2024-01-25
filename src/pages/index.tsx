import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session?.user.accessToken);

  return (
    <main>
      User Logged in : {JSON.stringify(session)}
      <h2 className="text-3xl font-bold text-center pt-[40vh] pb-[40vh]">
        Welcome to Restora.App
      </h2>
    </main>
  );
}
