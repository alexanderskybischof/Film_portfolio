import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';
import { workCategories } from '../data/work';
import { revealOnIntersect } from '../utils/revealOnIntersect';

const Work: React.FC = () => {
  useEffect(() => {
    return revealOnIntersect(document.querySelectorAll('.work-category-card, .work-fade'));
  }, []);

  return (
    <main className="page page--work">
      <div className="page-content page-content--work">
        <h1 className="work-fade">Work</h1>

        <section className="work-categories work-fade">
          {workCategories.map((category) => (
            <Link
              className="work-category-card"
              key={category.slug}
              to={
                category.slug === 'reel'
                  ? '/work/reel'
                  : category.slug === 'personal'
                    ? '/work/personal'
                    : `/work/${category.slug}`
              }
            >
              <div className="work-category-card__label">
                <h2 className="work-category-card__title">{category.title}</h2>
              </div>
              <div className="work-category-card__media">
                {!category.cardImage ? (
                  <div className="work-row__placeholder" aria-label={category.cardImageAlt}>
                    Media Coming Soon
                  </div>
                ) : category.cardImageType === 'video' ? (
                  <video
                    src={category.cardImage}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="metadata"
                    aria-label={category.cardImageAlt}
                  />
                ) : (
                  <img src={category.cardImage} alt={category.cardImageAlt} loading="lazy" />
                )}
              </div>
            </Link>
          ))}
        </section>

        <SiteFooter />
      </div>
    </main>
  );
};

export default Work;
