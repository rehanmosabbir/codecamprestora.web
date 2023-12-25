import { Inter } from "next/font/google";
import { Layout } from "@/components/LayoutComponent/Layout";
import { BranchCreation } from "@/components/BranchCreationComponent/BranchCreation";

export default function Home() {
  return (
    <div className="sm:px-5 px-3">
      <div className="bg-gray-100 min-h-[90vh] rounded-lg">
        <BranchCreation></BranchCreation>
      </div>
    </div>
  );
}
