import React from "react";
import DraggableItem from "./DraggableItem";
import Image from "next/image";
import { useImageContext } from "@/context/ImageContext";

type DraggableItemWrapperProps = {
  index: number;
  width: number;
  height: number;
  scale: number;
  imageUrl: string;
};

export const DraggableItemWrapper = React.memo(
  ({ index, width, height, scale, imageUrl }: DraggableItemWrapperProps) => {
    const { updateRoomPosition, roomImages } = useImageContext();
    const zIndex = roomImages[index]?.z || 0;

    return (
      <DraggableItem
        index={index}
        _width={width}
        _height={height}
        zIndex={zIndex}
        scale={scale}
        onPositionChange={updateRoomPosition}
      >
        <Image
          draggable={false}
          priority
          src={imageUrl}
          width={width * scale}
          height={height * scale}
          alt={`room-image-${index}`}
        />
      </DraggableItem>
    );
  }
);
