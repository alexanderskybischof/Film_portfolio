import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const assetPrefix = process.env.PUBLIC_URL || '';
  const reelEmbedUrl = 'https://player.vimeo.com/video/1173915010';

  return (
    <>
      <header className="hero-section" id="home">
        <div className="hero-layout">
          <div className="hero-text">
            <p className="hero-kicker">DIRECTOR · CINEMATOGRAPHER · EDITOR</p>
            <img src={`${assetPrefix}/Alex.jpeg`} alt="Alexander Sky portrait" className="hero-portrait" />
            <p className="hero-description">
              Freelance Filmmaker currently located in Sydney, Australia. Comfortable shooting for documentaries, commercials, music videos, short films, social media, and more.
            </p>
            <div className="hero-actions">
              <Link to="/work" className="hero-action hero-action--primary">
                View Work
              </Link>
              <Link to="/contact" className="hero-action">
                Contact
              </Link>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-video-frame">
              <iframe
                className="hero-video"
                src={reelEmbedUrl}
                title="Featured reel"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="hero-caption">Featured reel. Press Play to start.</p>
          </div>
        </div>
      </header>

      <footer className="footer">
        <a
          href="https://www.instagram.com/askypic"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <img src="igicon.png" alt="Instagram" className="logo-ig" />
        </a>
        <a
          href="https://www.tiktok.com/@kinnoshitasky"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <img src="ttlogo.png" alt="TikTok" className="logo-tiktok" />
        </a>
        <a
          href="https://www.youtube.com/@kinoshitasky"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <img src="ytgreenlogo.png" alt="YouTube" className="logo-yt" />
        </a>
      </footer>
    </>
  );
};

export default Home;
