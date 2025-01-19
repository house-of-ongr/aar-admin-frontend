import React, { memo } from "react";
import Image from "next/image";

import API_CONFIG from "@/config/api";
import Link from "next/link";

type SingleRoom = {
  roomId: number;
  name: string;
  width: number;
  height: number;
  imagePath: string;
  borderPath?: string;
  x: number;
  y: number;
  z: number;
  // 추후 삭제
  form: string;
};

type RenderImagesProps = {
  houseData: {
    houseId: number | string;
    house: {
      borderImageId: number;
      borderPath?: string;
    };
    rooms: SingleRoom[];
  };
  scale: number;
};

const RenderImages = memo(({ houseData, scale }: RenderImagesProps) => {
  console.log("render image - houseData", houseData);

  return (
    <div className="relative w-4/5 h-full flex justify-center border-l-2">
      <div className="relative">
        <Image
          priority
          alt="house-border-image"
          width={window.innerHeight}
          height={window.innerHeight}
          src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${houseData.house.borderPath}`}
        />

        {houseData.rooms.map((room, index) => (
          <Link key={room.imagePath} href={`/houses/${houseData.houseId}/rooms/${houseData.rooms[index].roomId}`}>
            <Image
              priority
              key={room.name}
              src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${room.imagePath}`}
              // src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/private/images/${room.imageId}`}
              alt={room.name}
              width={Number(room.width) * scale}
              height={Number(room.height) * scale}
              style={{
                position: "absolute",
                left: Number(room.x) * scale,
                top: Number(room.y) * scale,
                zIndex: room.z,
              }}
              className=" transition-transform duration-300 ease-in-out hover:scale-105 hover:z-20 cursor-pointer"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}, arePropsEqual);

function arePropsEqual(prevProps: RenderImagesProps, nextProps: RenderImagesProps) {
  return (
    prevProps.houseData.house.borderImageId === nextProps.houseData.house.borderImageId &&
    JSON.stringify(prevProps.houseData.rooms) === JSON.stringify(nextProps.houseData.rooms) &&
    prevProps.scale === nextProps.scale
  );
}

export default RenderImages;
