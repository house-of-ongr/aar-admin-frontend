import { EditableRoomData } from "@/app/houses/[houseId]/page";
import React from "react";
import ContainerTitle from "./ContainerTitle";
import InputField from "./InputField";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { TbHomeEdit } from "react-icons/tb";

type RoomFormProps = {
  rooms: EditableRoomData[];
  isEdit: boolean;
  onChange: (index: number, field: keyof EditableRoomData, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  toggleEdit: () => void;
};

export default function RoomForm({ rooms, isEdit, onChange, onSubmit, onCancel, toggleEdit }: RoomFormProps) {
  return (
    <div className="rounded-md pt-7 px-7 mx-3 border border-[#df754b] ">
      {isEdit ? (
        <div className="flex gap-3 justify-end">
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

      <ContainerTitle stepText="SECOND" headingText="방 정보" />
      {rooms.map((room, index) => (
        <InputField
          key={index}
          label={`Room Id - ${room.roomId}`}
          id={`room-${room.imageId}`}
          value={room.name}
          readOnly={!isEdit}
          onChange={(e) => onChange(index, "name", e.target.value)}
        />
      ))}
    </div>
  );
}
