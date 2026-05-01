"use client";

import type { ProductImage } from "./product.types";

type ProductImageRailMobileProps = {
  images: ProductImage[];
  activeImage: number;
  onImageChange: (index: number) => void;
  title: string;
};

export default function ProductImageRailMobile({
  images,
  activeImage,
  onImageChange,
  title,
}: ProductImageRailMobileProps) {
  if (images.length <= 1) return null;

  return (
    <div className="-mx-5 mt-8 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[9px] uppercase tracking-[0.45em] text-neutral-400">
          Galerie
        </p>

        <p className="text-xs text-neutral-400">
          {activeImage + 1} / {images.length}
        </p>
      </div>

      <div className="flex gap-3">
        {images.map((image, index) => {
          const active = index === activeImage;

          return (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => onImageChange(index)}
              className="shrink-0"
            >
              <div
                className={`h-[104px] w-[76px] overflow-hidden transition-all duration-500 ${
                  active ? "opacity-100" : "opacity-35"
                }`}
              >
                <img
                  src={image.url}
                  alt={image.altText ?? title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div
                className={`mt-3 h-px transition-all duration-300 ${
                  active ? "w-full bg-black" : "w-4 bg-black/20"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}