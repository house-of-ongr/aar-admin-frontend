"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API_CONFIG from "@/config/api";
import SpinnerIcon from "@/components/SpinnerIcon";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import { MdOutlineArrowBackIos } from "react-icons/md";
import RenderImages from "@/components/RenderImages";
import { HouseDetail, Room } from "@/types/house";
import HouseForm from "@/components/HouseForm";
import RoomForm from "@/components/RoomForm";

type HouseData = {
  houseId: string | number;
  house: HouseDetail;
  rooms: Room[];
};

export type EditableRoomData = {
  imageId: number;
  name: string;
};

export type EditableHouseData = {
  house: {
    title: string;
    author: string;
    description: string;
    createdDate: string;
  };
  rooms: EditableRoomData[];
};

export default function HouseDetailPage() {
  const params = useParams<{ houseId: string }>();

  const [houseData, setHouseData] = useState<HouseData | null>(null);
  const [editableData, setEditableData] = useState<EditableHouseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [scale, setScale] = useState<number | null>(null);
  const [isEditHouseInfo, setIsEditHouseInfo] = useState<boolean>(false);
  const [isEditRoomInfo, setIsEditRoomInfo] = useState<boolean>(false);

  const router = useRouter();

  const houseDeleteHandler = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/houses/${params.houseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update house data");
      }

      const result = await response.json();
      console.log("House deleted successfully:", result.message);
      alert(result.message);
      router.push("/houses", { scroll: false });
    } catch (error) {
      console.error("Error updating house data:", error);
    }
  };

  const houseDataSubmitHandler = async () => {
    if (!houseData) return;

    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/houses/${params.houseId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: houseData.house.title,
          author: houseData.house.author,
          description: houseData.house.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update house data");
      }

      const result = await response.json();
      console.log("House data updated successfully:", result);

      setIsEditHouseInfo(false);
    } catch (error) {
      console.error("Error updating house data:", error);
    }
  };

  const roomDataSubmitHandler = async () => {
    if (!houseData) return;

    try {
      const roomUpdates = houseData.rooms.map(async (room) => {
        const response = await fetch(`${API_CONFIG.BACK_API}/houses/rooms/${params.houseId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            originalName: room.originalName,
            newName: room.name,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update room: ${room.name}`);
        }

        return response.json();
      });

      const results = await Promise.all(roomUpdates);
      console.log("Rooms updated successfully:", results);
      setIsEditRoomInfo(false);
    } catch (error) {
      console.error("Error updating room data:", error);
    }
  };

  const handleHouseChange = (field: keyof EditableHouseData["house"], value: string) => {
    setEditableData((prev) => (prev ? { ...prev, house: { ...prev.house, [field]: value } } : null));
  };

  const handleRoomChange = (index: number, field: keyof EditableRoomData, value: string) => {
    setEditableData((prev) => {
      if (!prev) return null;
      const updatedRooms = prev.rooms.map((room, idx) => (idx === index ? { ...room, [field]: value } : room));
      return { ...prev, rooms: updatedRooms };
    });
  };

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BACK_API}/houses/${params.houseId}`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch house data");
        }
        const data = await response.json();
        console.log("house data :", data);

        const roomsEditableData = data.rooms.map((room: Room) => ({
          imageId: room.imageId,
          name: room.name,
          originalName: room.originalName,
        }));

        setHouseData(data);
        setEditableData({
          house: {
            title: data.house.title,
            author: data.house.author,
            description: data.house.description,
            createdDate: data.house.createdDate,
          },
          rooms: roomsEditableData,
        });
        const broswerHeight = window.innerHeight;

        setScale(broswerHeight / 5000);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouseData();
  }, [params.houseId]);

  if (loading)
    return (
      <div className="w-full h-full flex-center">
        <SpinnerIcon />
      </div>
    );
  if (houseData && editableData && scale)
    return (
      <div className="w-full h-full flex items-center">
        <div className="w-1/5 h-full flex flex-col gap-4 overflow-scroll">
          {/* 왼쪽 상단 */}
          <div className="w-full pt-6  px-3 flex justify-between items-center">
            <Link href={"/houses"} className="cursor-pointer  hover:bg-orange-300 rounded-full p-2">
              <MdOutlineArrowBackIos size={20} />
            </Link>
            <h1 className="font-bold">하우스 디테일 </h1>
            <Button label="DELETE" onClick={houseDeleteHandler} />
          </div>
          {/* 하우스 정보*/}
          <HouseForm
            houseData={editableData.house}
            isEdit={isEditHouseInfo}
            onChange={handleHouseChange}
            onSubmit={houseDataSubmitHandler}
            onCancel={() => setIsEditHouseInfo(false)}
            toggleEdit={() => setIsEditHouseInfo(true)}
          />
          {/* 룸 정보*/}
          <RoomForm
            rooms={editableData.rooms}
            isEdit={isEditRoomInfo}
            onChange={handleRoomChange}
            onSubmit={roomDataSubmitHandler}
            onCancel={() => setIsEditRoomInfo(false)}
            toggleEdit={() => setIsEditRoomInfo(true)}
          />
        </div>
        {/* 이미지 렌더링 섹션 - 오른쪽 */}
        <RenderImages houseId={houseData.housId} houseData={houseData} scale={scale} />
      </div>
    );
}
