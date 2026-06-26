import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';
import { getCategoryBySlug, getText } from '../data/work';
import { useLanguage } from '../i18n';
import { revealOnIntersect } from '../utils/revealOnIntersect';

const WorkCategory: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug);
  const { language } = useLanguage();

  useEffect(() => {
    return revealOnIntersect(document.querySelectorAll('.work-row, .work-fade'));
  }, [categorySlug]);

  if (!category || category.slug === 'reel') {
    return <Navigate to="/work" replace />;
  }

  return (
    <main className="page page--work">
      <div className="page-content page-content--work">
        <div className="project-detail__header work-fade visible">
          <Link to="/work" className="project-detail__back-link">
            {language === 'ja' ? '作品一覧へ戻る' : 'Back to Work'}
          </Link>
          <h1 className="work-fade visible">{getText(category.title, language)}</h1>
        </div>

        <section className="work-list work-fade visible">
          {category.projects.map((project) => (
            <Link
              className="work-row"
              key={project.slug}
              to={`/work/${category.slug}/${project.slug}`}
            >
              <div className="work-row__label">
                <h2 className="work-row__title">{getText(project.title, language)}</h2>
              </div>
              <div className="work-row__media">
                {!project.thumbnail.src ? (
                  <div className="work-row__placeholder" aria-label={getText(project.thumbnail.alt, language)}>
                    {language === 'ja' ? '準備中' : 'Media Coming Soon'}
                  </div>
                ) : project.thumbnail.type === 'video' ? (
                  <video
                    src={project.thumbnail.src}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="metadata"
                    aria-label={getText(project.thumbnail.alt, language)}
                  />
                ) : (
                  <img
                    src={project.thumbnail.src}
                    alt={getText(project.thumbnail.alt, language)}
                    loading="lazy"
                    draggable={false}
                    style={
                      project.thumbnail.objectPosition
                        ? { objectPosition: project.thumbnail.objectPosition }
                        : undefined
                    }
                  />
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

export default WorkCategory;
