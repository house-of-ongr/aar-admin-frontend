"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import API_CONFIG from "@/config/api";
import Image from "next/legacy/image";
import Button from "@/components/buttons/Button";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { useRoomContext } from "@/context/RoomsContext";
import CardLabel from "@/components/label/CardLabel";

type Room = {
  name: string;
  width: number;
  height: number;
  imageId: number;
  roomId: number;
};

export default function AdminRoomDetailPage() {
  const { rooms } = useRoomContext();
  const params = useParams<{ houseId: string; roomId: string }>();
  const router = useRouter();
  const { houseId, roomId } = params;

  const [roomData, setRoomData] = useState<Room | null>(null);

  const navigateOtherRoomDetailPage = () => {
    const currentIndex = rooms.findIndex((room) => room.roomId === parseInt(roomId));
    const nextIndex = (currentIndex + 1) % rooms.length;
    const nextRoom = rooms[nextIndex];
    if (nextRoom) {
      router.push(`/houses/${houseId}/rooms/${nextRoom.roomId}`);
    }
  };

  const navigateHouseListPage = () => {
    router.push("/houses", { scroll: false });
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BACK_API}/houses/rooms/${roomId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch room data");
        }
        const data = await response.json();
        setRoomData(data.room);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  if (!roomData) {
    return (
      <div className="w-full h-full flex-center">
        <SpinnerIcon />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full px-10 py-3 flex justify-between items-center  border-b-2 bg-stone-800">
        <div className="py-1 ">
          <CardLabel size="large" hasPadding hasBorder text={`ROOM ID# ${roomId}`} />
          <p className="pt-2 text-white"> Room Name: {roomData.name}</p>
          <p className="text-white">
            Room Dimensions: W {roomData.width} x H {roomData.height}
          </p>
        </div>

        <div className="flex gap-3">
          <Button label="NEXT" onClick={navigateOtherRoomDetailPage} />
          <Button label="EXIT" onClick={navigateHouseListPage} />
        </div>
      </div>

      <div className="relative w-full h-full">
        <Image
          src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${roomData.imageId}`}
          alt={roomData.name}
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
    </div>
  );
}
