'use client';

import React from 'react';

interface YouTubeProps {
  id: string;
  title?: string;
}

export default function YouTube({ id, title = 'YouTube video' }: YouTubeProps) {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden my-6 rounded-lg">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
