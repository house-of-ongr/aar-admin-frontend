import Image from "next/image";
import React, { useState } from "react";
import SpinnerIcon from "../icons/SpinnerIcon";

interface BorderImagePreviewProps {
  imageUrl: string | null;
  setScale: (scale: number) => void;
}

const BorderImagePreview: React.FC<BorderImagePreviewProps> = React.memo(({ imageUrl, setScale }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    const img = e.currentTarget;
    const { naturalWidth, naturalHeight } = img;
    const renderedWidth = img.clientWidth;
    const scale = renderedWidth / naturalWidth;
    setScale(scale);
  };

  return (
    <div className="aspect-square h-full ">
      {isLoading && (
        <div className="absolute inset-0 flex-center z-10">
          <SpinnerIcon />
        </div>
      )}
      {imageUrl && (
        <Image src={imageUrl} alt="Border Preview" width={5000} height={5000} onLoad={(img) => handleImageLoad(img)} />
      )}
    </div>
  );
});

export default BorderImagePreview;
