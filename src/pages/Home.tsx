import React from 'react';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';
import { useLanguage } from '../i18n';

const Home: React.FC = () => {
  const assetPrefix = process.env.PUBLIC_URL || '';
  const reelEmbedUrl = 'https://player.vimeo.com/video/1173915010';
  const { language } = useLanguage();

  const copy =
    language === 'ja'
      ? {
          portraitAlt: 'アレクサンダー・スカイのポートレート',
          description:
            'シドニーを拠点に活動するフリーランスの映像作家。カリフォルニア州バークレー育ちで、自然、スポーツ、音楽を映像で捉えることに関心があります。暖かい気候やサーフィン、ヘアカット、ガーデニングが好きです。',
          work: '作品を見る',
          contact: '連絡先',
          reelTitle: '注目のリール',
          reelCaption: '注目のリール。再生ボタンを押してご覧ください。',
        }
      : {
          portraitAlt: 'Alexander Sky portrait',
          description:
            'Freelance Filmmaker currently located in Sydney, Australia. Raised in Berkeley, CA interested in capturing the outdoors, sports, and music. I like warm weather, surfing, cutting hair, and gardening.',
          work: 'View Work',
          contact: 'Contact',
          reelTitle: 'Featured reel',
          reelCaption: 'Featured reel. Press Play to start.',
        };

  return (
    <>
      <header className="hero-section" id="home">
        <div className="hero-layout">
          <div className="hero-text">
            <img src={`${assetPrefix}/Alex.jpeg`} alt={copy.portraitAlt} className="hero-portrait" />
            <p className="hero-description">{copy.description}</p>
            <div className="hero-actions">
              <Link to="/work" className="hero-action hero-action--primary">
                {copy.work}
              </Link>
              <Link to="/contact" className="hero-action">
                {copy.contact}
              </Link>
            </div>
            <div className="hero-otter-wrap">
              <div className="hero-otter" aria-hidden="true">
                <img src={`${assetPrefix}/otter.png`} alt="" className="hero-otter-image" />
              </div>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-video-frame">
              <iframe
                className="hero-video"
                src={reelEmbedUrl}
                title={copy.reelTitle}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="hero-caption">{copy.reelCaption}</p>
          </div>
        </div>
      </header>

      <SiteFooter />
    </>
  );
};

export default Home;
