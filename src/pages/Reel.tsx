import React from 'react';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';

const Reel: React.FC = () => {
  const reelEmbedUrl = 'https://player.vimeo.com/video/1173915010';

  return (
    <main className="page page--project">
      <div className="page-content page-content--project">
        <div className="project-detail__header work-fade visible">
          <Link to="/work" className="project-detail__back-link">
            Back to Work
          </Link>
          <h1>Reel</h1>
        </div>

        <section className="project-detail__video project-detail__video--single work-fade visible">
          <div className="project-detail__video-grid project-detail__video-grid--single">
            <div className="project-detail__video-frame">
              <iframe
                src={reelEmbedUrl}
                title="Reel video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
};

export default Reel;
