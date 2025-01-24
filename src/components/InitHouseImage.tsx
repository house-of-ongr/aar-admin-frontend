import Image from "next/image";

export default function InitHoutImage() {
  return (
    <div className="cursor-pointer">
      <Image priority src={"/images/house/AOO_INIT_HOUSE_GRAY.png"} alt="init-home" width={200} height={200} />
    </div>
  );
}
