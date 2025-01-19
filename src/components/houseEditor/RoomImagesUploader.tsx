import React from "react";
import { useImageContext } from "@/context/ImageContext";
import ContainerTitle from "../ContainerTitle";
import FileUploadButton from "../buttons/FileUploadButton";
import FileName from "./FileName";
import { IoAlertCircle } from "react-icons/io5";

export default function RoomImagesUploader() {
  const { borderImage, roomImages, updateRoomZIndex, handleFileChange, updateRoomTitle } = useImageContext();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, "room");
  };

  const handleTitleChange = (index: number, newTitle: string) => {
    const maxLength = 40;
    if (newTitle.length > maxLength) {
      alert(`하우스 룸 타이틀은 최대 ${maxLength}자까지 입력 가능합니다.`);
      return;
    }
    updateRoomTitle(index, newTitle);
  };

  const handleZIndexChange = (index: number, zIndex: number) => {
    updateRoomZIndex(index, zIndex);
  };

  return (
    <div className="rounded-2xl py-3 px-7 bg-[#F8EFE6] ">
      <ContainerTitle stepText="Third" headingText="하우스 룸 이미지 업로드" />

      <div className="flex flex-col items-center">
        <input
          type="file"
          id="rooms-img"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          disabled={!borderImage}
        />
        <FileUploadButton htmlFor="rooms-img" />
        {!borderImage && (
          <div className="flex items-center gap-1">
            <IoAlertCircle color="#FF6347" />
            <p className="text-red-500 text-sm mt-1"> 하우스 보더 이미지를 먼저 업로드해야 합니다.</p>
          </div>
        )}
      </div>

      {roomImages.map((room, index) => (
        <div key={index} className="mt-2 mb-4">
          <div className="flex items-center mb-2">
            <FileName fileName={room.file.name} />
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              id={`room-title-${index + 1}`}
              className="p-2 w-full rounded outline-none text-sm"
              placeholder={`룸${index + 1} 타이틀 입력하세요`}
              value={room.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
            />

            <div className="flex-center my-3 w-full gap-1 ">
              <span className="text-xs font-medium ">{room.z || 5}</span>

              <input
                type="range"
                min="1"
                max="10"
                value={room.z || 5}
                className="w-3/4 h-[6px] bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                style={{
                  background: "linear-gradient(-90deg, #ea6e2f 0%, #f4efff 100%)",
                }}
                onChange={(e) => handleZIndexChange(index, parseInt(e.target.value, 10))}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
