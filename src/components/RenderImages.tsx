import React, { memo } from "react";
import Image from "next/image";
import API_CONFIG from "@/config/api";
import Link from "next/link";
import { HouseDetail, Room } from "@/types/house";

type RenderImagesProps = {
  houseData: {
    house: HouseDetail;
    rooms: Room[];
  };
  scale: number;
};

const RenderImages = memo(({ houseData, scale }: RenderImagesProps) => {
  console.log("houseData?", houseData.house.borderImageId);
  return (
    <section className="relative w-4/5 h-full flex justify-center border-l-2">
      <div className="relative">
        <Image
          priority
          alt="house-border-image"
          width={window.innerHeight}
          height={window.innerHeight}
          src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${houseData.house.borderImageId}`}
        />

        {houseData.rooms.map((room, index) => (
          <Link key={room.imageId} href={`/houses/${houseData.house.houseId}/rooms/${room.roomId}`}>
            <Image
              priority
              key={room.name}
              src={`${API_CONFIG.PRIVATE_IMAGE_LOAD_API}/${room.imageId}`}
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
    </section>
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
