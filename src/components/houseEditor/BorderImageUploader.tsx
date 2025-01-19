import { useImageContext } from "@/context/ImageContext";
import React, { useState } from "react";
import FileUploadButton from "../buttons/FileUploadButton";
import FileName from "./FileName";
import ContainerTitle from "../ContainerTitle";

export default function BorderImageUploader() {
  const { handleFileChange } = useImageContext();
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, "border");
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="rounded-2xl pt-3 pb-6 px-7 bg-[#F8EFE6] ">
      <ContainerTitle stepText="Second" headingText="하우스 보더 이미지 업로드" />
      <div className="flex flex-col items-center gap-6">
        {/* input 숨김 */}
        <input type="file" id="border-img" className="hidden" accept="image/*" onChange={handleFileUpload} />
        <FileUploadButton htmlFor="border-img" />
        <div className="w-full flex text-start">{fileName && <FileName fileName={fileName} />}</div>
      </div>
    </div>
  );
}
