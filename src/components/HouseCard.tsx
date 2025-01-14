import React from "react";
import Image from "next/image";
import { House } from "@/types/house";
import { FaRegPenToSquare } from "react-icons/fa6";
import API_CONFIG from "@/config/api";

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
              {house.title}
            </p>
            <p className="font-thin text-xs text-stone-500">Designed by {house.author}</p>
          </div>

          <p className="text-[13px] md:text-[15px] mb-2 overflow-hidden line-clamp-2">{house.description}</p>
        </div>

        <div className="text-[12px] font-light text-stone-600">
          <div className="flex gap-1 items-center">
            <span>created / updated</span>{" "}
          </div>
          <div className="text-xs md:text-[14px] flex gap-1 items-center   ">
            <span className="hidden md:block">
              <FaRegPenToSquare size={12} />
            </span>
            {house.createdDate + ` / ` + house.updatedDate}
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center ml-2">
        <Image
          src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${house.imageId}`}
          alt={`${house.title}`}
          width={200}
          height={200}
        />
      </div>
    </>
  );
}
