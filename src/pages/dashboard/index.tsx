import { Inter } from "next/font/google";
import { Content } from "@/components/ContentComponent/Content";

const inter = Inter({ subsets: ["latin"] });

export default function Default() {
  return (
    <main>
      <Content />
    </main>
  );
}
