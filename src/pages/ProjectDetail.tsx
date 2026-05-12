import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';
import { getProjectByCategoryAndSlug, getText, getYoutubeEmbedUrl } from '../data/work';
import { useLanguage } from '../i18n';

type ProjectDetailProps = {
  fixedCategorySlug?: string;
  fixedProjectSlug?: string;
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ fixedCategorySlug, fixedProjectSlug }) => {
  const params = useParams<{ categorySlug: string; projectSlug: string }>();
  const categorySlug = fixedCategorySlug ?? params.categorySlug;
  const projectSlug = fixedProjectSlug ?? params.projectSlug;
  const projectMatch = getProjectByCategoryAndSlug(categorySlug, projectSlug);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number | null>(null);
  const { language } = useLanguage();
  const galleryFrames = projectMatch?.project.stillFrames.filter(
    (frame): frame is typeof frame & { src: string } => Boolean(frame.src),
  ) || [];

  useEffect(() => {
    if (activeFrameIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveFrameIndex(null);
        return;
      }

      if (event.key === 'ArrowRight') {
        setActiveFrameIndex((currentIndex) =>
          currentIndex === null ? currentIndex : (currentIndex + 1) % galleryFrames.length,
        );
      }

      if (event.key === 'ArrowLeft') {
        setActiveFrameIndex((currentIndex) =>
          currentIndex === null ? currentIndex : (currentIndex - 1 + galleryFrames.length) % galleryFrames.length,
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeFrameIndex, galleryFrames.length]);

  if (!projectMatch) {
    return <Navigate to="/work" replace />;
  }

  const { category, project } = projectMatch;
  const embedUrl = project.videoType === 'youtube' ? getYoutubeEmbedUrl(project.videoUrl) : '';
  const secondaryEmbedUrl =
    project.secondaryVideoUrl && project.videoType === 'youtube'
      ? getYoutubeEmbedUrl(project.secondaryVideoUrl)
      : '';
  const videoItems = project.videos?.length
    ? project.videos.map((video) => ({
        ...video,
        embedUrl: video.videoType === 'youtube' && video.videoUrl ? getYoutubeEmbedUrl(video.videoUrl) : '',
      }))
    : project.videoUrl
      ? [
          {
            title: project.title,
            videoType: project.videoType,
            videoUrl: project.videoUrl,
            embedUrl,
          },
          ...(project.secondaryVideoUrl
            ? [
                {
                  title:
                    language === 'ja'
                      ? { en: `${getText(project.title, 'en')} alternate video`, ja: `${getText(project.title, 'ja')} 別バージョン` }
                      : { en: `${getText(project.title, 'en')} alternate video`, ja: `${getText(project.title, 'ja')} 別バージョン` },
                  videoType: project.videoType,
                  videoUrl: project.secondaryVideoUrl,
                  embedUrl: secondaryEmbedUrl,
                },
              ]
            : []),
        ]
      : [];
  const hasSingleVideo = videoItems.length === 1;
  const isPersonalProject = category.slug === 'personal';
  const displayTitle = isPersonalProject ? getText(category.title, language) : getText(project.title, language);
  const useCompactSingleVideo = isPersonalProject && hasSingleVideo;
  const shouldCenterLastVideo = videoItems.length > 1 && videoItems.length % 2 === 1;
  const activeFrame = activeFrameIndex !== null ? galleryFrames[activeFrameIndex] : null;
  const backLinkTo = isPersonalProject ? '/work' : `/work/${category.slug}`;
  const descriptionClassName = `project-detail__description work-fade visible${videoItems.length ? '' : ' project-detail__description--plain'}`;
  const projectTitle = getText(project.title, language);
  const backToWork = language === 'ja' ? '作品一覧へ戻る' : 'Back to Work';
  const mediaComingSoon = language === 'ja' ? '準備中' : 'Media coming soon';
  const photoSlot = language === 'ja' ? '写真枠' : 'Photo slot';
  const photoPlaceholder = language === 'ja' ? '写真プレースホルダー' : 'Photo placeholder';
  const closeLabel = language === 'ja' ? '閉じる' : 'Close';
  const previousPhoto = language === 'ja' ? '前の写真' : 'Previous photo';
  const nextPhoto = language === 'ja' ? '次の写真' : 'Next photo';
  const openPrefix = language === 'ja' ? '' : 'Open ';
  const dialogLabel = language === 'ja' ? `${projectTitle} 画像ビューア` : `${projectTitle} image viewer`;
  const stillsLabel = language === 'ja' ? `${projectTitle} スチル一覧` : `${projectTitle} still frames`;
  const description = getText(project.description, language);

  return (
    <main className="page page--project">
      <div className="page-content page-content--project">
        <div className="project-detail__header work-fade visible">
          <Link to={backLinkTo} className="project-detail__back-link">
            {backToWork}
          </Link>
          <h1>{displayTitle}</h1>
        </div>

        {description && videoItems.length ? (
          <section className={descriptionClassName}>
            <p>{description}</p>
          </section>
        ) : null}

        {videoItems.length ? (
          <section className="project-detail__video work-fade visible">
            <div
              className={`project-detail__video-grid${hasSingleVideo ? ' project-detail__video-grid--single' : ''}${useCompactSingleVideo ? ' project-detail__video-grid--single-compact' : ''}`}
            >
              {videoItems.map((video, index) => (
                <div
                  className={`project-detail__video-frame${(shouldCenterLastVideo && index === videoItems.length - 1) || useCompactSingleVideo ? ' project-detail__video-frame--centered' : ''}`}
                  key={`${getText(video.title, 'en')}-${index}`}
                >
                  {video.videoType === 'youtube' ? (
                    <iframe
                      src={video.embedUrl}
                      title={getText(video.title, language)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  ) : (
                    <video
                      src={video.videoUrl}
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={getText(video.title, language)}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className={descriptionClassName}>
            <p>{description || mediaComingSoon}</p>
          </section>
        )}

        {project.stillFrames.length ? (
          <section className="project-detail__stills work-fade visible" aria-label={stillsLabel}>
            {project.stillFrames.map((frame) => {
              const frameAlt = getText(frame.alt, language);
              return (
                <figure
                  className={`project-detail__still${frame.solidBackground ? ' project-detail__still--solid' : ''}`}
                  key={frame.src || frameAlt}
                >
                  {frame.src ? (
                    <button
                      type="button"
                      className="project-detail__still-button"
                      onClick={() => {
                        const nextIndex = galleryFrames.findIndex((galleryFrame) => galleryFrame.src === frame.src);
                        setActiveFrameIndex(nextIndex === -1 ? null : nextIndex);
                      }}
                      aria-label={language === 'ja' ? `${frameAlt} を開く` : `${openPrefix}${frameAlt}`}
                    >
                      <img
                        className={frame.solidBackground ? 'project-detail__still-image--solid' : undefined}
                        src={frame.src}
                        alt={frameAlt}
                        loading="lazy"
                      />
                    </button>
                  ) : (
                    <div className="project-detail__media-placeholder" aria-label={frameAlt}>
                      <span>{getText(frame.label, language) || photoSlot}</span>
                      <small>{photoPlaceholder}</small>
                    </div>
                  )}
                </figure>
              );
            })}
          </section>
        ) : null}

        {activeFrame ? (
          <div
            className="project-detail__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={dialogLabel}
            onClick={() => setActiveFrameIndex(null)}
          >
            <button
              type="button"
              className="project-detail__lightbox-close"
              onClick={() => setActiveFrameIndex(null)}
              aria-label={language === 'ja' ? '画像ビューアを閉じる' : 'Close image viewer'}
            >
              {closeLabel}
            </button>
            {galleryFrames.length > 1 ? (
              <button
                type="button"
                className="project-detail__lightbox-nav project-detail__lightbox-nav--prev"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveFrameIndex((currentIndex) =>
                    currentIndex === null ? currentIndex : (currentIndex - 1 + galleryFrames.length) % galleryFrames.length,
                  );
                }}
                aria-label={previousPhoto}
              >
                &#8249;
              </button>
            ) : null}
            <div className="project-detail__lightbox-content" onClick={(event) => event.stopPropagation()}>
              <img src={activeFrame.src} alt={getText(activeFrame.alt, language)} />
            </div>
            {galleryFrames.length > 1 ? (
              <button
                type="button"
                className="project-detail__lightbox-nav project-detail__lightbox-nav--next"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveFrameIndex((currentIndex) =>
                    currentIndex === null ? currentIndex : (currentIndex + 1) % galleryFrames.length,
                  );
                }}
                aria-label={nextPhoto}
              >
                &#8250;
              </button>
            ) : null}
          </div>
        ) : null}

        <SiteFooter />
      </div>
    </main>
  );
};

export default ProjectDetail;
