"use client";

import React from "react";
import { useMemo, useState } from "react";
import { useImageContext } from "@/context/ImageContext";
import Button from "@/components/Button";
import BorderImagePreview from "@/components/houseEditor/BorderImagePreview";
import BorderImageUploader from "@/components/houseEditor/BorderImageUploader";
import HouseImageUploader from "@/components/houseEditor/HouseImageUploader";
import RoomImagesUploader from "@/components/houseEditor/RoomImagesUploader";
import { DraggableItemWrapper } from "@/components/houseEditor/DraggableItemWrapper";

const BACK_API = process.env.NEXT_PUBLIC_BACK_API;

export default function HouseEditorPage() {
  const { houseImage, borderImage, roomImages } = useImageContext();
  const [scale, setScale] = useState<number>(1);

  const saveHandler = async () => {
    const formData = new FormData();

    const metadata = {
      house: {
        title: houseImage?.title,
        author: houseImage?.author,
        description: houseImage?.description,
        width: houseImage?.width,
        height: houseImage?.height,
        houseFormName: "houseImage",
        borderFormName: "borderImage",
      },
      rooms: roomImages.map((room) => ({
        formName: `${room.id}`,
        name: room.title,
        width: room.width,
        height: room.height,
        x: room.x,
        y: room.y,
        z: room.z,
      })),
    };

    formData.append("houseImage", houseImage!.file);
    formData.append("borderImage", borderImage!.file);
    roomImages.map((room) => {
      formData.append(`${room.id}`, room.file);
    });

    formData.append("metadata", JSON.stringify(metadata));

    // console.log("FormData:", formData.get("metadata"));

    try {
      const response = await fetch(`${BACK_API}/admin/houses`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Save success:", result);
      } else {
        const error = await response.json();
        console.error("Save failed:", error);
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving data.");
    }
  };

  const borderImageURL = useMemo(() => borderImage && URL.createObjectURL(borderImage.file), [borderImage?.file]);

  return (
    <div className="w-full h-full flex items-center">
      <div className="w-1/5 h-full flex flex-col justify-between gap-4 px-2 py-10">
        <div>
          <HouseImageUploader />
          <BorderImageUploader />
          <RoomImagesUploader />
        </div>

        <Button label="SAVE" onClick={saveHandler} />
      </div>

      <div className="relative w-4/5 h-full flex justify-center bg-slate-200  ">
        <div className="relative">
          {borderImage && <BorderImagePreview setScale={setScale} imageUrl={borderImageURL} />}
          {roomImages.length > 0 &&
            scale &&
            roomImages.map((room, index) => (
              <DraggableItemWrapper
                key={index}
                index={index}
                width={room.width!}
                height={room.height!}
                scale={scale}
                file={room.file}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
