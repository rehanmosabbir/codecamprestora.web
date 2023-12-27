import user from "@/assets/user.jpg";
import Image from "next/image";
import { GoGear } from "react-icons/go";

export const User = () => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <Image
          className="rounded-3xl mr-3 -ml-2"
          src={user}
          alt={"images"}
          width={34}
          height={34}
          priority
        />
      </div>
      <GoGear />
    </div>
  );
};
