'use client';

import React, { useEffect, useRef } from 'react';

interface TweetProps {
  id: string;
}

const Tweet: React.FC<TweetProps> = ({ id }) => {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    // Render tweet
    if (window.twttr && tweetRef.current) {
      window.twttr.widgets.createTweet(id, tweetRef.current, {
        conversation: 'none',
        dnt: true,
      });
    } else {
      // If Twitter widgets aren't loaded yet, wait for them
      script.onload = () => {
        if (window.twttr && tweetRef.current) {
          window.twttr.widgets.createTweet(id, tweetRef.current, {
            conversation: 'none',
            dnt: true,
          });
        }
      };
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [id]);

  return (
    <div className="flex justify-center my-8">
      <div ref={tweetRef} className="twitter-tweet" />
    </div>
  );
};

export default Tweet;

// Add TypeScript declaration for window.twttr
declare global {
  interface Window {
    twttr: any;
  }
}
