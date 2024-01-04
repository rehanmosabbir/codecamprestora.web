import user from "@/assets/user.jpg";
import Image from "next/image";

export const UserInfo = () => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <Image
          className="rounded-3xl mr-3 -ml-2"
          src={user}
          alt={"images"}
          width={40}
          height={40}
          priority
        />
      </div>
    </div>
  );
};