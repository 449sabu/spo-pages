import Script from 'next/script';
import React, { useEffect, useRef } from 'react';

export interface EmbedTwitterProps {
  id: string;
}

const EmbedTwitter: React.FC<EmbedTwitterProps> = (props) => {
  return (
    <div className="flex justify-center m-auto">
      <Tweet id={props.id} />
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
    </div>
  );
};

export default EmbedTwitter;

export const Tweet: React.FC<{ id: string }> = ({ id }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-expect-error マウント後にtwttrを探す
    window.twttr?.widgets.load(ref.current);
  }, [id]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: generateEmbedHtml(id) }}
      ref={ref}
    />
  );
};

const generateEmbedHtml = (id: string): string => {
  if (!/^\d+$/u.test(id)) {
    throw new Error(`Invalid tweet ID: ${id}`);
  }

  return `<blockquote class="twitter-tweet"><a href="https://twitter.com/i/status/${id}"></a></blockquote>`;
};
