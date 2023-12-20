import logo from "@/image/logo.png";
import Image from "next/image";

export const AppLogo = () => {
  return <Image src={logo} alt={"images"} width={100} height={100} priority />;
};
