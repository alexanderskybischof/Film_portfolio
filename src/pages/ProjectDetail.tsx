import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useGalleryNavigation from '../hooks/useGalleryNavigation';
import useGalleryScrollLock from '../hooks/useGalleryScrollLock';
import { Link, Navigate, useParams } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';
import YoutubePlayer from '../components/YoutubePlayer';
import { getProjectByCategoryAndSlug, getText, getVimeoEmbedUrl, getYoutubeEmbedUrl } from '../data/work';
import { useLanguage } from '../i18n';

type ProjectDetailProps = {
  fixedCategorySlug?: string;
  fixedProjectSlug?: string;
};

const getCircularOffset = (index: number, activeIndex: number, total: number) => {
  const rawOffset = index - activeIndex;
  const half = total / 2;

  if (rawOffset > half) {
    return rawOffset - total;
  }

  if (rawOffset < -half) {
    return rawOffset + total;
  }

  return rawOffset;
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

  const { isMobile, swipeHandlers } = useGalleryNavigation((direction) => {
    setActiveFrameIndex((index) => index === null ? null :
      (index + direction + galleryFrames.length) % galleryFrames.length);
  });

  useGalleryScrollLock(activeFrameIndex !== null);

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

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeFrameIndex, galleryFrames.length]);

  if (!projectMatch) {
    return <Navigate to="/work" replace />;
  }

  const { category, project } = projectMatch;
  const getEmbedUrl = (videoType: 'youtube' | 'vimeo' | 'local', videoUrl?: string) => {
    if (!videoUrl) {
      return '';
    }

    if (videoType === 'youtube') {
      return getYoutubeEmbedUrl(videoUrl);
    }

    if (videoType === 'vimeo') {
      return getVimeoEmbedUrl(videoUrl);
    }

    return '';
  };

  const embedUrl = getEmbedUrl(project.videoType, project.videoUrl);
  const secondaryEmbedUrl =
    project.secondaryVideoUrl ? getEmbedUrl(project.videoType, project.secondaryVideoUrl) : '';
  const videoItems = project.videos?.length
    ? project.videos.map((video) => ({
        ...video,
        embedUrl: getEmbedUrl(video.videoType, video.videoUrl),
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
  const isAigamoProject = project.slug === 'aigamo-documentary';
  const displayTitle = isPersonalProject ? getText(category.title, language) : getText(project.title, language);
  const useCompactSingleVideo = isPersonalProject && hasSingleVideo;
  const shouldCenterLastVideo = videoItems.length > 1 && videoItems.length % 2 === 1;
  const activeFrame = activeFrameIndex !== null ? galleryFrames[activeFrameIndex] : null;
  const activeGalleryIndex = activeFrameIndex ?? 0;
  const backLinkTo = isPersonalProject ? '/work' : `/work/${category.slug}`;
  const descriptionClassName = `project-detail__description work-fade visible${videoItems.length ? '' : ' project-detail__description--plain'}`;
  const projectTitle = getText(project.title, language);
  const backToWork = language === 'ja' ? '作品一覧へ戻る' : 'Back to Work';
  const mediaComingSoon = language === 'ja' ? '準備中' : 'Media coming soon';
  const photoSlot = language === 'ja' ? '写真枠' : 'Photo slot';
  const photoPlaceholder = language === 'ja' ? '写真プレースホルダー' : 'Photo placeholder';
  const previousPhoto = language === 'ja' ? '前の写真' : 'Previous photo';
  const nextPhoto = language === 'ja' ? '次の写真' : 'Next photo';
  const openPrefix = language === 'ja' ? '' : 'Open ';
  const dialogLabel = language === 'ja' ? `${projectTitle} 画像ビューア` : `${projectTitle} image viewer`;
  const stillsLabel = language === 'ja' ? `${projectTitle} スチル一覧` : `${projectTitle} still frames`;
  const description = getText(project.description, language);
  const descriptionSection = description ? (
    <section className={descriptionClassName}>
      <p>{description}</p>
    </section>
  ) : null;
  const stillsSection = project.stillFrames.length ? (
    <section
      className={`project-detail__stills work-fade visible${isAigamoProject ? ' project-detail__stills--gallery' : ''}`}
      aria-label={stillsLabel}
    >
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
                  draggable={false}
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
  ) : null;
  const videoSection = videoItems.length ? (
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
              <YoutubePlayer
                embedUrl={video.embedUrl}
                title={getText(video.title, language)}
                poster={index === 0 && !project.videos?.length && project.thumbnail.type === 'image'
                  ? project.thumbnail.src
                  : undefined}
              />
            ) : video.videoType === 'vimeo' ? (
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
  );

  return (
    <main className="page page--project">
      <div className="page-content page-content--project">
        <div className="project-detail__header work-fade visible">
          <Link to={backLinkTo} className="project-detail__back-link">
            {backToWork}
          </Link>
          <h1>{displayTitle}</h1>
        </div>

        {isAigamoProject ? (
          <>
            {descriptionSection}
            {stillsSection}
            {videoSection}
          </>
        ) : (
          <>
            {descriptionSection}
            {videoSection}
            {stillsSection}
          </>
        )}

        {activeFrame ? createPortal(
          <div
            className="project-detail__lightbox project-detail__lightbox--carousel"
            role="dialog"
            aria-modal="true"
            aria-label={dialogLabel}
          >
            <button
              type="button"
              className="project-detail__lightbox-backdrop"
              onClick={() => setActiveFrameIndex(null)}
              aria-label={language === 'ja' ? '画像ビューアを閉じる' : 'Close image viewer'}
            />
            <button
              type="button"
              className="project-detail__lightbox-close"
              onClick={() => setActiveFrameIndex(null)}
              aria-label={language === 'ja' ? '画像ビューアを閉じる' : 'Close image viewer'}
            >
              ×
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
            <span className="gallery-count" aria-live="polite">{activeGalleryIndex + 1} / {galleryFrames.length}</span>
            <div className="project-detail__lightbox-stage" {...swipeHandlers}>
              {galleryFrames.map((frame, index) => {
                const offset = getCircularOffset(index, activeGalleryIndex, galleryFrames.length);
                const isVisible = isMobile ? offset === 0 : Math.abs(offset) <= 2;
                if (!isVisible) return null;

                return (
                  <button
                    key={frame.src}
                    type="button"
                    className={`project-detail__lightbox-card${offset === 0 ? ' project-detail__lightbox-card--active' : ''}`}
                    style={{ '--project-lightbox-offset': offset } as React.CSSProperties}
                    onClick={() => setActiveFrameIndex(index)}
                    aria-label={getText(frame.alt, language)}
                    aria-hidden={!isVisible}
                    tabIndex={isVisible ? 0 : -1}
                  >
                    <img src={frame.src} alt={getText(frame.alt, language)} draggable={false} />
                  </button>
                );
              })}
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
          </div>,
          document.body,
        ) : null}

        <SiteFooter />
      </div>
    </main>
  );
};

export default ProjectDetail;
