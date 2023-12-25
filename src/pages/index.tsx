import { Inter } from "next/font/google";
import { Layout } from "@/components/LayoutComponent/Layout";
import { Roboto } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const { data } = useSession();
  return <main className={roboto.className}>{JSON.stringify(data)}</main>;
}
