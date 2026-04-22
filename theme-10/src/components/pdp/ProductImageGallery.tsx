import { useState, useRef } from "react";
import { getImageSrc } from "@/context/StoreContext";
import { StaticImageData } from "next/image";

interface ProductImageGalleryProps {
  images: (string | StaticImageData)[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main image with zoom */}
      <div
        ref={imageRef}
        className="relative flex aspect-square cursor-crosshair items-center justify-center overflow-hidden rounded-2xl bg-secondary"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={getImageSrc(images[selectedIndex])}
          alt={productName}
          className="h-full w-full object-contain p-8 transition-transform duration-300"
          style={isZoomed ? { transform: "scale(2)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border-2 bg-secondary p-2 transition-all ${i === selectedIndex ? "border-accent" : "border-border hover:border-muted-foreground"
              }`}
          >
            <img src={getImageSrc(img)} alt={`${productName} view ${i + 1}`} className="h-full w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
