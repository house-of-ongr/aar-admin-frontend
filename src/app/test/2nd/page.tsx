"use client";

import TestDraggableItem from "@/components/TestDraggableItem";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function Test2ndPage() {
  const [scale, setScale] = useState(0.2);
  const ORIGIN_IMG_WIDTH = 2006;
  const ORIGIN_IMG_HEIGHT = 2006;
  const borderRef = useRef<HTMLDivElement | null>(null);

  const images = [
    { src: "/images/test/2nd/rec1.png", width: 1051, height: 448, alt: "rec1" },
    { src: "/images/test/2nd/rec2.png", width: 632, height: 448, alt: "rec2" },
    { src: "/images/test/2nd/rec3.png", width: 879, height: 677, alt: "rec3" },
    { src: "/images/test/2nd/rec4.png", width: 853, height: 677, alt: "rec4" },
    { src: "/images/test/2nd/roof.png", width: 1782, height: 645, alt: "roof" },
  ];

  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;
      console.log("screenWidth", screenWidth);
      if (screenWidth >= 1200) {
        setScale(0.2); // PC
      } else if (screenWidth >= 768) {
        setScale(0.18); // 태블릿
      } else {
        setScale(0.08); // 모바일
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="relative w-full h-full bg-gray-400">
      <div
        ref={borderRef}
        className="absolute left-1/2 top-0 transform -translate-x-1/2"
        style={{
          width: ORIGIN_IMG_WIDTH * scale,
          height: ORIGIN_IMG_HEIGHT * scale,
        }}
      >
        <Image
          src="/images/test/2nd/house-border.png"
          alt="house-border"
          width={ORIGIN_IMG_WIDTH * scale}
          height={ORIGIN_IMG_HEIGHT * scale}
        />
      </div>

      {images.map((image, index) => (
        <TestDraggableItem key={index}>
          <Image
            draggable={false}
            priority
            src={image.src}
            width={image.width * scale}
            height={image.height * scale}
            alt={image.alt}
          />
        </TestDraggableItem>
      ))}
    </div>
  );
}
