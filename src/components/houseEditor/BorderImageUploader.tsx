import { useImageContext } from "@/context/ImageContext";
import React from "react";

export default function BorderImageUploader() {
  const { borderImage, setBorderImage, handleFileChange } = useImageContext();

  const handleBorderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (borderImage) {
      const newTitle = e.target.value;
      const maxLength = 30;
      if (newTitle.length > maxLength) {
        alert(`보더 타이틀은 최대 ${maxLength}자까지 입력 가능합니다.`);
        return;
      }

      setBorderImage((prev) => ({
        ...prev!,
        title: newTitle,
      }));
    }
  };

  return (
    <div className="p-2">
      <label>2nd. 하우스 보더 이미지 업로드</label>

      <input
        type="file"
        id="border-img"
        className="cursor-pointer border rounded-lg w-full"
        accept="image/*"
        onChange={(e) => handleFileChange(e, "border")}
      />
      {borderImage && (
        <div className="mt-2">
          <label htmlFor="border-title" className="text-sm font-light">
            하우스 보더 타이틀
          </label>
          <input
            type="text"
            id="border-title"
            className="py-1 px-2 w-full rounded border border-orange-300"
            placeholder="보더 타이틀 입력하세요"
            value={borderImage.title}
            onChange={handleBorderChange}
          />
        </div>
      )}
    </div>
  );
}
