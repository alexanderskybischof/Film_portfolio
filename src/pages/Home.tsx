import React from 'react';
import SiteFooter from '../components/SiteFooter';
import { useLanguage } from '../i18n';

const Home: React.FC = () => {
  const assetPrefix = process.env.PUBLIC_URL || '';
  const { language } = useLanguage();

  const copy =
    language === 'ja'
      ? {
          portraitAlt: 'アレクサンダー・スカイのポートレート',
          description:
            'オーストラリア・シドニーを拠点に活動するフリーランスの映像作家。カリフォルニア州バークレーと日本の大阪で育ち、自然、スポーツ、音楽を映像で捉えることに関心があります。ボストン大学で映画・テレビとデータサイエンスを学んでいます。暖かい気候やサーフィン、ヘアカット、ガーデニングが好きです。',
          contactLabel: '連絡先',
          contactEmail: 'alex@stomii.com',
        }
      : {
          portraitAlt: 'Alexander Sky portrait',
          description:
            'Freelance Filmmaker currently based in Sydney, Australia. Raised in Berkeley, CA and Osaka, Japan interested in capturing the outdoors, sports, music and culture. Studying Film/TV and Data Science at Boston University. Some things I like include warm weather, surfing, cutting hair, and gardening.',
          contactLabel: 'Contact',
          contactEmail: 'alex@stomii.com',
        };

  return (
    <main className="info-page" id="info">
      <section className="info-hero">
        <div className="info-layout">
          <div className="info-photo-panel">
            <img src={`${assetPrefix}/Alex.jpeg`} alt={copy.portraitAlt} className="info-photo" />
          </div>
          <div className="info-copy-panel">
            <p className="info-description">{copy.description}</p>
            <section className="info-contact-block" aria-labelledby="info-contact-heading">
              <h2 id="info-contact-heading" className="info-section-label">
                {copy.contactLabel}
              </h2>
              <a href={`mailto:${copy.contactEmail}`} className="info-contact-link">
                {copy.contactEmail}
              </a>
            </section>
            <div className="info-otter-wrap">
              <div className="info-otter" aria-hidden="true">
                <img src={`${assetPrefix}/otter.png`} alt="" className="hero-otter-image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

export default Home;
