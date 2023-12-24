import { Inter } from "next/font/google";
import { Layout } from "@/components/LayoutComponent/Layout";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return <main className={roboto.className}></main>;
}
