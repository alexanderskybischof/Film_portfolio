import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';
import { getCategoryBySlug } from '../data/work';
import { revealOnIntersect } from '../utils/revealOnIntersect';

const WorkCategory: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug);

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
            Back to Work
          </Link>
          <h1 className="work-fade visible">{category.title}</h1>
        </div>

        <section className="work-list work-fade visible">
          {category.projects.map((project) => (
            <Link
              className="work-row"
              key={project.slug}
              to={`/work/${category.slug}/${project.slug}`}
            >
              <div className="work-row__label">
                <h2 className="work-row__title">{project.title}</h2>
              </div>
              <div className="work-row__media">
                {project.thumbnail.type === 'video' ? (
                  <video
                    src={project.thumbnail.src}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="metadata"
                    aria-label={project.thumbnail.alt}
                  />
                ) : (
                  <img src={project.thumbnail.src} alt={project.thumbnail.alt} loading="lazy" />
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
