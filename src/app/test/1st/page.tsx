"use client";

import TestDraggableItem from "@/components/TestDraggableItem";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Test1stPage() {
  const [scale, setScale] = useState(0.2);
  const [houseBorder, setHouseBorder] = useState(false);

  // 보더-하우스 이미지의 값 : 5000 * 5000  일때
  // 이상적으로 보이는 비율(화면에 렌더링된 이미지 사이즈의 width /원본 이미지 width)
  // pc: 0.2
  // 노트북 : 0.2
  // 탭 : 0.18
  // 모바일 : 0.08
  // const SCALE = 0.2

  const images = [
    { src: "/images/test/1st/1f.png", width: 3789, height: 977, alt: "1f" },
    { src: "/images/test/1st/2f-1.png", width: 1526, height: 1071, alt: "2f-1" },
    { src: "/images/test/1st/2f-2.png", width: 2215, height: 1054, alt: "2f-2" },
    { src: "/images/test/1st/3f-1.png", width: 2380, height: 1134, alt: "3f-1" },
    { src: "/images/test/1st/3f-2.png", width: 1428, height: 1200, alt: "3f-2" },
    { src: "/images/test/1st/4f-roof.png", width: 3799, height: 1394, alt: "4f-roof" },
  ];

  // 화면 크기에 따라 SCALE 값 동적 계산
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
    <div className=" h-full relative flex justify-center ">
      <div className="relative w-full h-full bg-gray-400">
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
    </div>
  );
}
