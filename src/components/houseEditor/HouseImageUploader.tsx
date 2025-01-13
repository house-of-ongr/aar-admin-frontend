import { useImageContext } from "@/context/ImageContext";
import React from "react";

export default function HouseImageUploader() {
  const { houseImage, setHouseImage, handleFileChange } = useImageContext();

  const handleHouseInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (houseImage) {
      setHouseImage((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };
  return (
    <div className="p-2">
      <h3>1st. 하우스 프로필 이미지 업로드</h3>
      <input
        type="file"
        id="house-img"
        className="cursor-pointer border rounded-lg w-full"
        accept="image/*"
        onChange={(e) => handleFileChange(e, "house")}
      />
      {houseImage && (
        <div className="mt-2">
          <label htmlFor="house-title" className="text-sm font-light">
            하우스 네임
          </label>
          <input
            type="text"
            id="house-title"
            name="title"
            className="py-1 px-2 w-full rounded border border-orange-300"
            placeholder="하우스 타이틀 입력하세요"
            value={houseImage.title || ""}
            onChange={handleHouseInfoChange}
          />
          <label htmlFor="house-author" className="text-sm font-light">
            하우스 작가명
          </label>
          <input
            type="text"
            id="house-author"
            name="author"
            className="py-1 px-2 w-full rounded border border-orange-300"
            placeholder="하우스 작가명 입력하세요"
            value={houseImage.author || ""}
            onChange={handleHouseInfoChange}
          />
          <label htmlFor="house-description" className="text-sm font-light">
            하우스 디스크립션
          </label>
          <textarea
            id="house-description"
            name="description"
            className="min-h-32 py-1 px-2 w-full rounded border border-orange-300"
            placeholder="하우스 Description 입력하세요"
            value={houseImage.description || ""}
            onChange={handleHouseInfoChange}
          />
        </div>
      )}
    </div>
  );
}
