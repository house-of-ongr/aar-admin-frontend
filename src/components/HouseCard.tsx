import { House } from "@/types/house";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import React from "react";
import { FaRegPenToSquare } from "react-icons/fa6";

type HouseProps = {
  house: House;
};

export default function HouseCard({ house }: HouseProps) {
  return (
    <>
      <div className="w-1/2 p-2  flex flex-col justify-between">
        <div>
          <span className="text-xs text-[#f5946d]"> {`AOO HOUSE NO.${house.id}`}</span>

          <div className="py-2">
            <p className="text-[13px] md:text-[15px] font-semibold text-ellipsis overflow-hidden line-clamp-2">
              {house.name}
            </p>
            <p className="font-thin text-xs text-stone-500">Designed by {house.author}</p>
          </div>

          <p className="text-[13px] md:text-[15px] mb-2 overflow-hidden line-clamp-2">{house.description}</p>
        </div>

        <div className="text-[12px] font-light text-stone-600">
          <div className="flex gap-1 items-center">
            <span>created / updated</span>{" "}
          </div>
          <div className="text-xs md:text-[14px] flex gap-1 items-center   " suppressHydrationWarning>
            <span className="hidden md:block">
              <FaRegPenToSquare size={12} />
            </span>
            {formatDate(house.createdAt) + ` / ` + formatDate(house.updatedAt)}
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center ml-2">
        {/* todo : image data 값에서 추출한 src 넣기 */}
        <Image src="/images/house/AOO_sample_241225.png" alt="house" width={200} height={200} />
      </div>
    </>
  );
}
