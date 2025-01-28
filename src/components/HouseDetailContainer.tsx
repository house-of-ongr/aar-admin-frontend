"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HouseDetail, Room } from "@/types/house";
import { useRoomContext } from "@/context/RoomsContext";
import Button from "@/components/buttons/Button";
import RenderImages from "@/components/RenderImages";
import HouseForm from "@/components/HouseForm";
import RoomForm from "@/components/RoomForm";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import API_CONFIG from "@/config/api";

export type HouseData = {
  house: HouseDetail;
  rooms: Room[];
};

export type EditableRoomData = {
  imageId: number;
  roomId: number;
  name: string;
  originalName?: string;
};

export type EditableHouseData = {
  house: {
    title: string;
    author: string;
    description: string;
    createdDate?: string;
  };
  rooms: EditableRoomData[];
};

export default function HouseDetailContainer({ houseData, houseId }: { houseData: HouseData; houseId: string }) {
  const { setRooms } = useRoomContext();
  const [editableData, setEditableData] = useState<EditableHouseData | null>(null);
  const [isEditHouseInfo, setIsEditHouseInfo] = useState<boolean>(false);
  const [isEditRoomInfo, setIsEditRoomInfo] = useState<boolean>(false);
  const [scale] = useState<number | null>(null);

  const router = useRouter();

  const houseDeleteHandler = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/houses/${houseId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to delete house");
      //  * todo :house delete 성공 모달창으로 보여주기
      alert("House deleted successfully");
      router.push("/houses");
    } catch (error) {
      console.error(error);
    }
  };

  const houseDataSubmitHandler = async () => {
    if (!editableData) return;

    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/houses/${houseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editableData.house),
      });

      if (!response.ok) throw new Error("Failed to update house data");
      // * todo :house update 성공 모달창으로 보여주기
      alert("House updated successfully");
      setIsEditHouseInfo(false);
    } catch (error) {
      console.error(error);
    }
  };

  const roomDataSubmitHandler = async () => {
    if (!editableData) return;

    const changedRooms = editableData.rooms
      .filter((room) => room.name !== room.originalName)
      .map((room) => ({ roomId: room.roomId, newName: room.name }));

    if (changedRooms.length === 0) {
      // * todo : 모달창
      alert("변경된 방 이름이 존재하지 않습니다");
      return;
    }

    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/houses/rooms`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changedRooms),
      });

      if (!response.ok) throw new Error("Failed to update room data");
      // * todo : 모달창
      alert("Room names updated successfully");
      setIsEditRoomInfo(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const roomsEditableData = houseData.rooms.map((room) => ({
      imageId: room.imageId,
      roomId: room.roomId,
      name: room.name,
      originalName: room.name,
    }));

    setEditableData({
      house: {
        title: houseData.house.title,
        author: houseData.house.author,
        description: houseData.house.description,
        createdDate: houseData.house.createdDate,
      },
      rooms: roomsEditableData,
    });
    // 로컬스토리지에 저장
    setRooms(houseData.rooms);
  }, [houseData, setRooms]);

  if (!editableData) return <div>Loading...</div>;

  if (houseData && editableData && scale)
    return (
      <div className="w-full h-full flex items-center">
        <section className="w-1/5 h-full flex flex-col gap-4 overflow-scroll">
          <div className="w-full pt-6 px-3 flex justify-between items-center">
            <ArrowBackIcon href="/houses" />
            <h1 className="font-bold">House Detail</h1>
            <Button label="DELETE" onClick={houseDeleteHandler} />
          </div>
          <HouseForm
            houseData={editableData.house}
            isEdit={isEditHouseInfo}
            onChange={(field, value) =>
              setEditableData((prev) => prev && { ...prev, house: { ...prev.house, [field]: value } })
            }
            onSubmit={houseDataSubmitHandler}
            onCancel={() => setIsEditHouseInfo(false)}
            toggleEdit={() => setIsEditHouseInfo(true)}
          />
          <RoomForm
            rooms={editableData.rooms}
            isEdit={isEditRoomInfo}
            onChange={(index, field, value) =>
              setEditableData((prev) => {
                if (!prev) return null;
                const updatedRooms = prev.rooms.map((room, idx) =>
                  idx === index ? { ...room, [field]: value } : room
                );
                return { ...prev, rooms: updatedRooms };
              })
            }
            onSubmit={roomDataSubmitHandler}
            onCancel={() => setIsEditRoomInfo(false)}
            toggleEdit={() => setIsEditRoomInfo(true)}
          />
        </section>
        <RenderImages houseData={houseData} scale={1} />
      </div>
    );
}
