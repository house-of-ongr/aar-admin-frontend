import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"} className="flex flex-col items-center md:flex-row gap-2 p-5 cursor-pointer">
      <Image
        src={"/images/logo/logo_type_face_bold.png"}
        alt="archive of ongr logo type face"
        width={180}
        height={20}
      />
    </Link>
  );
}
