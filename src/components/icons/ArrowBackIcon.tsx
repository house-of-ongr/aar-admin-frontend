import Link from "next/link";
import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";

export default function ArrowBackIcon() {
  return (
    <Link href={"/houses"} className="cursor-pointer  hover:bg-[#F5946D] hover:text-white rounded-full p-2">
      <MdOutlineArrowBackIos size={20} />
    </Link>
  );
}
