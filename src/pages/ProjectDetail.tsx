import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';
import { getProjectByCategoryAndSlug, getYoutubeEmbedUrl } from '../data/work';

const ProjectDetail: React.FC = () => {
  const { categorySlug, projectSlug } = useParams<{ categorySlug: string; projectSlug: string }>();
  const projectMatch = getProjectByCategoryAndSlug(categorySlug, projectSlug);

  if (!projectMatch) {
    return <Navigate to="/work" replace />;
  }

  const { category, project } = projectMatch;
  const embedUrl = project.videoType === 'youtube' ? getYoutubeEmbedUrl(project.videoUrl) : '';
  const secondaryEmbedUrl =
    project.secondaryVideoUrl && project.videoType === 'youtube'
      ? getYoutubeEmbedUrl(project.secondaryVideoUrl)
      : '';

  return (
    <main className="page page--project">
      <div className="page-content page-content--project">
        <div className="project-detail__header work-fade visible">
          <Link to={`/work/${category.slug}`} className="project-detail__back-link">
            Back to Work
          </Link>
          <h1>{project.title}</h1>
        </div>

        <section className="project-detail__video work-fade visible">
          <div className={`project-detail__video-grid${secondaryEmbedUrl ? '' : ' project-detail__video-grid--single'}`}>
            <div className="project-detail__video-frame">
              {project.videoType === 'youtube' ? (
                <iframe
                  src={embedUrl}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              ) : (
                <video
                  src={project.videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={project.title}
                />
              )}
            </div>
            {secondaryEmbedUrl ? (
              <div className="project-detail__video-frame">
                <iframe
                  src={secondaryEmbedUrl}
                  title={`${project.title} alternate video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            ) : null}
          </div>
        </section>

        {project.stillFrames.length ? (
          <section className="project-detail__stills work-fade visible" aria-label={`${project.title} still frames`}>
            {project.stillFrames.map((frame) => (
              <figure
                className={`project-detail__still${frame.solidBackground ? ' project-detail__still--solid' : ''}`}
                key={frame.src}
              >
                <img
                  className={frame.solidBackground ? 'project-detail__still-image--solid' : undefined}
                  src={frame.src}
                  alt={frame.alt}
                  loading="lazy"
                />
              </figure>
            ))}
          </section>
        ) : null}

        <SiteFooter />
      </div>
    </main>
  );
};

export default ProjectDetail;
