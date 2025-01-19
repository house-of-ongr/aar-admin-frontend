import React from "react";
import { LuFileImage } from "react-icons/lu";

type FileNameProp = {
  fileName: string;
};
export default function FileName({ fileName }: FileNameProp) {
  return (
    <div className="flex p-1 rounded-md gap-1 text-white bg-[#343131] ">
      <LuFileImage color="#EEDF7A" size={20} />
      <span className="w-full  text-sm">{fileName}</span>
    </div>
  );
}
