import React from "react";
import InputField from "./InputField";
import ContainerTitle from "./ContainerTitle";
import { EditableHouseData } from "@/app/houses/[houseId]/page";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { TbHomeEdit } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

type HouseFormProps = {
  houseData: EditableHouseData["house"];
  isEdit: boolean;
  onChange: (field: keyof EditableHouseData["house"], value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  toggleEdit: () => void;
};

export default function HouseForm({ houseData, isEdit, onChange, onSubmit, onCancel, toggleEdit }: HouseFormProps) {
  return (
    <div className="rounded-2xl p-7 m-3 bg-[#F8EFE6]">
      {isEdit ? (
        <div className="flex gap-3 justify-end ">
          <div className="hover:text-[#df754b] cursor-pointer">
            <IoMdCheckmark size={20} onClick={onSubmit} />
          </div>

          <div className="hover:text-[#df754b] cursor-pointer">
            <IoMdClose size={20} onClick={onCancel} />
          </div>
        </div>
      ) : (
        <div className="flex justify-end hover:text-[#df754b] cursor-pointer">
          <TbHomeEdit size={20} onClick={toggleEdit} />
        </div>
      )}
      <ContainerTitle stepText="FIRST" headingText="하우스 정보" />

      {/* </div> */}
      <InputField
        label="House Title"
        id="house-title"
        value={houseData.title}
        readOnly={!isEdit}
        onChange={(e) => onChange("title", e.target.value)}
      />
      <InputField
        label="Author"
        id="house-author"
        value={houseData.author}
        readOnly={!isEdit}
        onChange={(e) => onChange("author", e.target.value)}
      />
      <InputField
        label="Description"
        id="house-description"
        value={houseData.description}
        readOnly={!isEdit}
        isSingleLine={false}
        onChange={(e) => onChange("description", e.target.value)}
      />
    </div>
  );
}
