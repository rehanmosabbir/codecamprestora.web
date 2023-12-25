import { Inter } from "next/font/google";
import { Layout } from "@/components/LayoutComponent/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Default() {
  return (
    <main>
      <Layout />
    </main>
  );
}
