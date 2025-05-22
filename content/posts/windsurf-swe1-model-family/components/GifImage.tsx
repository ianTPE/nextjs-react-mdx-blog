"use client";

import React from 'react';
import Image from 'next/image';

interface GifImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

const GifImage: React.FC<GifImageProps> = ({ 
  src, 
  alt, 
  caption, 
  width = 800, 
  height = 450 
}) => {
  return (
    <div className="my-8">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          unoptimized // 因為是 GIF，需要禁用優化
        />
      </div>
      {caption && (
        <p className="text-sm text-gray-600 text-center mt-2 italic">
          {caption}
        </p>
      )}
    </div>
  );
};

export default GifImage;