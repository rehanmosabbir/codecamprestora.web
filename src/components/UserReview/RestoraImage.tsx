import restora from "@/assets/berry.png";
import Image from "next/image";

export const RestoraImage = () => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <Image
          className="rounded-3xl mr-3 -ml-2"
          src={restora}
          alt={"images"}
          width={50}
          height={50}
          priority
        />
      </div>
    </div>
  );
};