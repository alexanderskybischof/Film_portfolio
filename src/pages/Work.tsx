import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';
import { getText, workCategories } from '../data/work';
import { useLanguage } from '../i18n';
import { revealOnIntersect } from '../utils/revealOnIntersect';

const Work: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    return revealOnIntersect(document.querySelectorAll('.work-category-card, .work-fade'));
  }, []);

  return (
    <main className="page page--work">
      <div className="page-content page-content--work">
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
                <h2 className="work-category-card__title">{getText(category.title, language)}</h2>
              </div>
              <div className="work-category-card__media">
                {!category.cardImage ? (
                  <div className="work-row__placeholder" aria-label={getText(category.cardImageAlt, language)}>
                    {language === 'ja' ? '準備中' : 'Media Coming Soon'}
                  </div>
                ) : category.cardImageType === 'video' ? (
                  <video
                    src={category.cardImage}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="metadata"
                    aria-label={getText(category.cardImageAlt, language)}
                  />
                ) : (
                  <img src={category.cardImage} alt={getText(category.cardImageAlt, language)} loading="lazy" />
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
