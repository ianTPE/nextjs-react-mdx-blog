'use client';

import { Tweet as ReactTweet } from 'react-tweet';

interface TweetProps {
  id: string;
}

export default function Tweet({ id }: TweetProps) {
  return (
    <div className="flex justify-center my-6">
      <div className="max-w-xl w-full">
        <ReactTweet id={id} />
      </div>
    </div>
  );
}
