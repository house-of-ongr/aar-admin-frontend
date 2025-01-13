import React from "react";
import { useImageContext } from "@/context/ImageContext";

export default function RoomImagesUploader() {
  const { borderImage, roomImages, updateRoomZIndex, handleFileChange, updateRoomTitle } = useImageContext();

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
    <div className="p-2">
      <label htmlFor="rooms-img">3rd. 하우스 룸 이미지 업로드</label>
      <input
        type="file"
        id="rooms-img"
        className="cursor-pointer border rounded-lg w-full"
        multiple
        accept="image/*"
        disabled={!borderImage}
        onChange={(e) => handleFileChange(e, "room")}
      />
      {!borderImage && <p className="text-red-500 text-sm mt-1">하우스 보더 이미지를 먼저 업로드하세요.</p>}
      {roomImages.map((room, index) => (
        <div key={index} className="mt-2">
          <div className="flex gap-10">
            <p className="text-sm font-light">파일 네임 : {room.file.name}</p>
          </div>

          <input
            type="text"
            id={`room-title-${index + 1}`}
            className="py-1 px-2 w-full rounded border border-orange-300"
            placeholder="룸 타이틀 입력하세요"
            value={room.title}
            onChange={(e) => handleTitleChange(index, e.target.value)}
          />
          <div className="mt-2 flex items-center gap-4">
            <label htmlFor={`z-index-${index}`} className="text-sm font-light">
              z :
            </label>
            <input
              type="range"
              id={`z-index-${index}`}
              className="cursor-pointer"
              min="0"
              max="10"
              value={room.z || 0}
              onChange={(e) => handleZIndexChange(index, parseInt(e.target.value, 10))}
            />
            <span>{room.z || 0}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
