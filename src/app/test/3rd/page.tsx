import DraggableItem from "@/components/houseEditor/DraggableItem";
import TestDraggableItem from "@/components/TestDraggableItem";
import Image from "next/image";

export default function Test3rdPage() {
  // 하우스 보더 x, 복층 구조 집 테스트

  const SCALE = 1;

  const images = [
    { src: "/images/test/3rd/1f-1.png", width: 693, height: 237, alt: "1f-1" },
    { src: "/images/test/3rd/2f-1.png", width: 369, height: 179, alt: "2f-1" },
    { src: "/images/test/3rd/2f-2.png", width: 320, height: 241, alt: "2f-2" },
    { src: "/images/test/3rd/duplex.png", width: 289, height: 432, alt: "duplex" },
  ];

  return (
    <div className="mx-auto h-full relative flex justify-center ">
      <div className="relative w-full h-full bg-gray-400">
        {images.map((image, index) => (
          <TestDraggableItem key={index}>
            <Image
              draggable={false}
              priority
              src={image.src}
              width={image.width * SCALE}
              height={image.height * SCALE}
              alt={image.alt}
            />
          </TestDraggableItem>
        ))}
      </div>
    </div>
  );
}
