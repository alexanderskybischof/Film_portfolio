import React from 'react';
import { useLanguage } from '../i18n';

const SiteFooter: React.FC = React.memo(() => {
  const assetPrefix = process.env.PUBLIC_URL || '';
  const { language } = useLanguage();
  const labels =
    language === 'ja'
      ? {
          instagram: 'インスタグラム',
          tiktok: 'TikTok',
          youtube: 'YouTube',
        }
      : {
          instagram: 'Instagram',
          tiktok: 'TikTok',
          youtube: 'YouTube',
        };

  return (
    <footer className="footer">
      <a
        href="https://www.instagram.com/askypic"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <img src={`${assetPrefix}/igicon.png`} alt={labels.instagram} className="logo-ig" />
      </a>
      <a
        href="https://www.tiktok.com/@kinnoshitasky"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <img src={`${assetPrefix}/ttlogo.png`} alt={labels.tiktok} className="logo-tiktok" />
      </a>
      <a
        href="https://www.youtube.com/@kinoshitasky"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <img src={`${assetPrefix}/ytgreenlogo.png`} alt={labels.youtube} className="logo-yt" />
      </a>
    </footer>
  );
});

export default SiteFooter;
