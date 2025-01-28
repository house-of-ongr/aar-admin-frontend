import React, { useState } from "react";
import Image from "next/image";
import API_CONFIG from "@/config/api";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import CardLabel from "../label/CardLabel";

export type AdminHouse = {
  id: number;
  title: string;
  author: string;
  description: string;
  createdDate?: string;
  updatedDate?: string;
  imageId: number;
};

type HouseTemplateProps = {
  adminHouses: AdminHouse[];
  registHomeToUsertHandler: (houseId: number) => void;
};
function HouseTemplates({ adminHouses, registHomeToUsertHandler }: HouseTemplateProps) {
  const [expandedHouseId, setExpandedHouseId] = useState<number | null>(null);

  return (
    <div className="mx-5">
      <h2 className="text-lg pb-3 ">하우스 템플릿</h2>
      {adminHouses.length === 0 ? (
        // 할당할 집이 없으면
        <div className="h-[150px] flex-center">해당 유저는 이미 모든 하우스를 가지고 있습니다.</div>
      ) : (
        <ul className="gap-7 grid grid-cols-2 ">
          {adminHouses.map((house) => (
            <li
              key={house.id}
              className="relative w-full border rounded-md p-3 justify-between shadow-md cursor-pointer hover:border-[#F5946D]"
              onClick={() => {
                registHomeToUsertHandler(house.id);
              }}
            >
              <CardLabel text={`AOO HOUSE ID#${house.id}`} hasPadding />
              <div className="flex flex-col items-center mt-2 ">
                <div className="bg-slate-500/10 inline-block rounded-full p-5">
                  <Image
                    priority
                    alt={`${house.title}`}
                    src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${house.imageId}`}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex items-start gap-1 ">
                  <div className="flex-shrink-0 pt-[14px]">
                    <BsFillInfoCircleFill
                      color="gray"
                      size={13}
                      className="cursor-pointer"
                      // onClick={() => {
                      //   showDetailBox(house.id);
                      // }}
                    />
                  </div>
                  <p className="break-words mt-2">{house.title}</p>
                </div>

                <div>
                  {expandedHouseId === house.id && (
                    <div className="absolute top-[5%] left-[10%] text-sm mt-2 w-[75%] bg-black/80 p-4 rounded-md text-white z-10 pb-5">
                      <div className="flex justify-end">
                        <div className=" cursor-pointer ">
                          <IoMdClose onClick={() => setExpandedHouseId(null)} />
                        </div>
                      </div>
                      <div className="text-[#F5946D]">Description </div>
                      <p className="break-words ">{house.description}</p>
                      <div>
                        <span className="text-[#F5946D] pr-1">Author </span> <span> {house.author}</span>
                      </div>
                      <div>
                        <span className="text-[#F5946D] pr-1">Created </span> {house.createdDate}
                      </div>
                      <div>
                        <span className="text-[#F5946D] pr-1">Updated </span> {house.updatedDate}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center mt-2">
                {/* <Button
                  label="SELECT"
                  onClick={() => {
                    registHomeToUsertHandler(house.id);
                  }}
                /> */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HouseTemplates;
