import logo from "@/assets/logo.png";
import Image from "next/image";

export const AppLogo = () => {
  return <Image src={logo} alt={"images"} width={90} height={90} priority />;
};
