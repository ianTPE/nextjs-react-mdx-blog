"use client";

import React from 'react';
import Image from 'next/image';

interface ImageData {
  src: string;
  alt: string;
  caption: string;
  title: string;
}

interface ImageGalleryProps {
  images: ImageData[];
  columns?: 1 | 2 | 3;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, columns = 2 }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 my-8`}>
      {images.map((image, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              unoptimized // 因為是 GIF
            />
          </div>
          <div className="p-4">
            <h4 className="font-semibold text-gray-900 mb-2">{image.title}</h4>
            <p className="text-sm text-gray-600">{image.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;