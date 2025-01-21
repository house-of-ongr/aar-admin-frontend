"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HouseDetail, Room } from "@/types/house";
import { useRoomContext } from "@/context/RoomsContext";
import API_CONFIG from "@/config/api";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import Button from "@/components/buttons/Button";
import RenderImages from "@/components/RenderImages";
import HouseForm from "@/components/HouseForm";
import RoomForm from "@/components/RoomForm";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";

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
    createdDate: string;
  };
  rooms: EditableRoomData[];
};

export default function HouseDetailPage() {
  const params = useParams<{ houseId: string }>();
  const { setRooms } = useRoomContext();

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
      //  * todo :house delete 성공 모달창으로 보여주기
      console.log("House deleted successfully:", result.message);
      alert(result.message);
      router.push("/houses", { scroll: false });
    } catch (error) {
      console.error("Error updating house data:", error);
    }
  };

  const houseDataSubmitHandler = async () => {
    console.log(`${API_CONFIG.BACK_API}/houses/${params.houseId}`);
    if (!houseData) return;

    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/houses/${params.houseId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editableData?.house.title,
          author: editableData?.house.author,
          description: editableData?.house.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update house data");
      }
      // * todo :house update 성공 모달창으로 보여주기
      const result = await response.json();
      console.log("House data updated successfully:", result);

      setIsEditHouseInfo(false);
      setHouseData((prev) => (prev ? { ...prev, house: { ...prev.house, ...editableData?.house } } : null));
    } catch (error) {
      console.error("Error updating house data:", error);
    }
  };

  const roomDataSubmitHandler = async () => {
    if (!editableData) return;

    const changedRooms = editableData.rooms
      .filter((room) => room.name !== room.originalName)
      .map((room) => ({
        roomId: room.roomId,
        newName: room.name,
      }));

    if (changedRooms.length === 0) {
      // * todo : 모달창
      alert("변경된 방 이름이 없습니다.");
      return;
    }

    try {
      const response = await fetch(`${API_CONFIG.BACK_API}/houses/rooms`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedRooms),
      });

      if (!response.ok) {
        throw new Error("Failed to update room data");
      }

      const result = await response.json();
      // * todo : 모달창
      console.log("Room data updated successfully:", result);

      setIsEditRoomInfo(false);
      setHouseData((prev) => {
        if (!prev) return null;
        const updatedRooms = prev.rooms.map((room) => {
          const updatedRoom = changedRooms.find((r) => r.roomId === room.roomId);
          return updatedRoom ? { ...room, name: updatedRoom.newName } : room;
        });
        return { ...prev, rooms: updatedRooms };
      });
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

        if (!response.ok) {
          throw new Error("Failed to fetch house data");
        }
        const data = await response.json();
        const roomsEditableData = data.rooms.map((room: Room) => ({
          imageId: room.imageId,
          roomId: room.roomId,
          name: room.name,
          originalName: room.name,
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

  useEffect(() => {
    if (houseData?.rooms) {
      setRooms(houseData.rooms);
    }
  }, [houseData?.rooms, setRooms]);

  if (loading)
    return (
      <div className="w-full h-full flex-center">
        <SpinnerIcon />
      </div>
    );
  if (houseData && editableData && scale)
    return (
      <div className="w-full h-full flex items-center">
        <section className="w-1/5 h-full flex flex-col gap-4 overflow-scroll">
          <div className="w-full pt-6  px-3 flex justify-between items-center">
            <ArrowBackIcon />
            <h1 className="font-bold">하우스 디테일 </h1>
            <Button label="DELETE" onClick={houseDeleteHandler} />
          </div>
          <HouseForm
            houseData={editableData.house}
            isEdit={isEditHouseInfo}
            onChange={handleHouseChange}
            onSubmit={houseDataSubmitHandler}
            onCancel={() => setIsEditHouseInfo(false)}
            toggleEdit={() => setIsEditHouseInfo(true)}
          />
          <RoomForm
            rooms={editableData.rooms}
            isEdit={isEditRoomInfo}
            onChange={handleRoomChange}
            onSubmit={roomDataSubmitHandler}
            onCancel={() => setIsEditRoomInfo(false)}
            toggleEdit={() => setIsEditRoomInfo(true)}
          />
        </section>

        <RenderImages houseData={houseData} scale={scale} />
      </div>
    );
}
