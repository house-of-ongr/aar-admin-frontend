"use client";

import React, { useEffect, useRef } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

interface DraggableItemProps {
  index: number;
  _width: number;
  _height: number;
  zIndex: number;
  scale: number;
  onPositionChange: (index: number, x: number, y: number) => void;
  children: React.ReactNode;
}

export default function ({ children, index, _width, _height, zIndex, scale, onPositionChange }: DraggableItemProps) {
  const nodeRef = useRef<HTMLDivElement>(null as any);

  const isDraggingRef = useRef(false);
  const ORIGIN_IMG_WIDTH = 5000;
  const ORIGIN_IMG_HEIGHT = 5000;

  const onDrag = (e: DraggableEvent, data: DraggableData) => {
    isDraggingRef.current = true;
  };

  const onStop = (e: DraggableEvent, data: DraggableData) => {
    isDraggingRef.current = false;

    // console.log("Dragged element position:", {
    //   index: index,
    //   x: data.x,
    //   y: data.y,
    //   width: data.node.clientWidth,
    //   height: data.node.clientHeight,
    // });

    if (onPositionChange) {
      onPositionChange(index, data.x, data.y);
    }
  };

  useEffect(() => {
    if (nodeRef.current) {
      console.log("image width:", window.getComputedStyle(nodeRef.current).width);
      console.log("image height:", window.getComputedStyle(nodeRef.current).height);
    }
  }, []);

  return (
    // right : (5000 - 방이미지 원본 너비) * 스케일
    // bottom : (5000 -  방 이미지 원본 높이) * 스케일

    <Draggable
      bounds={{
        left: 0,
        top: 0,
        right: (ORIGIN_IMG_WIDTH - _width) * scale,
        bottom: (ORIGIN_IMG_HEIGHT - _height) * scale,
      }}
      nodeRef={nodeRef}
      onStop={onStop}
      onDrag={onDrag}
    >
      {/* 1 + zIndex 를 하는 이유는 보더 이미지보다 위에 있어야하기때문에 */}
      <div className="absolute top-0 inline-block" style={{ zIndex: 1 + zIndex }} ref={nodeRef}>
        {children}
      </div>
    </Draggable>
  );
}
