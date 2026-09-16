import React, { useState } from 'react';
import { useLanguage } from '../i18n';

type YoutubePlayerProps = {
  embedUrl: string;
  title: string;
  poster?: string;
};

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ embedUrl, title, poster }) => {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const { language } = useLanguage();
  const videoId = embedUrl.split('/embed/')[1]?.split('?')[0];

  if (activeUrl === embedUrl) {
    return (
      <iframe
        src={`${embedUrl}&autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        ref={(frame) => frame?.focus()}
      />
    );
  }

  return (
    <button
      type="button"
      className="video-preview"
      onClick={() => setActiveUrl(embedUrl)}
      aria-label={language === 'ja' ? `${title} を再生` : `Play ${title}`}
    >
      <img
        src={poster || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        draggable={false}
      />
      <span className="video-preview__play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28">
          <path d="M8 4 L21 12 L8 20 Z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
};

export default YoutubePlayer;
