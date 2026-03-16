import React from 'react';

const SiteFooter: React.FC = React.memo(() => {
  const assetPrefix = process.env.PUBLIC_URL || '';

  return (
    <footer className="footer">
      <a
        href="https://www.instagram.com/askypic"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <img src={`${assetPrefix}/igicon.png`} alt="Instagram" className="logo-ig" />
      </a>
      <a
        href="https://www.tiktok.com/@kinnoshitasky"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <img src={`${assetPrefix}/ttlogo.png`} alt="TikTok" className="logo-tiktok" />
      </a>
      <a
        href="https://www.youtube.com/@kinoshitasky"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      >
        <img src={`${assetPrefix}/ytgreenlogo.png`} alt="YouTube" className="logo-yt" />
      </a>
    </footer>
  );
});

export default SiteFooter;
