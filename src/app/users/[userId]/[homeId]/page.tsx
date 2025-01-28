"use client";

import { HouseData } from "@/app/houses/[houseId]/page";
import CardLabel from "@/components/label/CardLabel";
import API_CONFIG from "@/config/api";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type BaseInfo = {
  homeId: number;
  homeName: string;
  createdDate: string;
  updatedDate: string;
};

export default function UserHomeDetailPage() {
  const params = useParams<{ homeId: string }>();
  const [scale, setScale] = useState<number | null>(null);
  const [homeData, setHomeData] = useState<HouseData | null>(null);
  const [info, setInfo] = useState<BaseInfo | null>(null);
  const [houseTempleteId, setHouseTempleteId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const fetchUserHomeData = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/homes/${params.homeId}`);
      const { homeId, homeName, createdDate, updatedDate, house, rooms } = await response.json();

      setInfo({ homeId, homeName, createdDate, updatedDate });
      setHomeData({ house, rooms });
      const broswerHeight = window.innerHeight;

      setScale(broswerHeight / 5000);
    } catch (error) {
      console.error("Failed to fetch user homes:", error);
    }
  };

  useEffect(() => {
    fetchUserHomeData();
    localStorage.setItem("userHomeId", JSON.stringify(params.homeId));
    const houseTempleteId = localStorage.getItem("houseId");
    setHouseTempleteId(Number(houseTempleteId));
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(Number(JSON.parse(userId)));
    }
  }, []);

  useEffect(() => {
    if (homeData) {
      localStorage.setItem("roomImagesId", JSON.stringify(homeData?.rooms?.map((room) => room.imageId) || []));
    }
  }, [homeData]);

  if (!info || !homeData) return <div>해당 유저가 가지고 있는 집이 존재하지 않습니다.</div>;

  if (homeData && scale)
    return (
      <div className="w-full h-full flex items-center">
        <section className="w-1/5 h-full flex flex-col overflow-scroll py-10 px-5">
          <div className="flex gap-1 flex-col">
            <CardLabel text={`HOUSE TEMPLETE ID#${houseTempleteId}`} size="large" />
            <CardLabel text={`HOME ID#${info.homeId}`} size="large" />
            <CardLabel text={`USER ID#${userId}`} size="large" />
          </div>
          <h1 className="text-lg font-extrabold pt-4">{info.homeName}</h1>
          <p className="text-sm  text-gray-400">
            생성일 {formatDate(info.updatedDate)} / 수정일 {formatDate(info.updatedDate)}
          </p>
        </section>

        <section className="relative w-4/5 h-full flex justify-center border-l-2">
          <div className="relative">
            <Image
              priority
              alt="user-home-border-image"
              width={window.innerHeight}
              height={window.innerHeight}
              src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${homeData.house.borderImageId}`}
            />
            {homeData.rooms.map((room) => (
              <Link key={room.imageId} href={`/users/${userId}/${info.homeId}/${room.roomId}`}>
                <Image
                  priority
                  key={room.name}
                  src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${room.imageId}`}
                  alt={room.name}
                  width={Number(room.width) * scale}
                  height={Number(room.height) * scale}
                  style={{
                    position: "absolute",
                    left: Number(room.x) * scale,
                    top: Number(room.y) * scale,
                    zIndex: room.z,
                  }}
                  className=" transition-transform duration-300 ease-in-out hover:scale-105 hover:z-20 cursor-pointer"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
}
