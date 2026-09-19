import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useGalleryNavigation from '../hooks/useGalleryNavigation';
import useGalleryScrollLock from '../hooks/useGalleryScrollLock';
import SiteFooter from '../components/SiteFooter';
import { useLanguage } from '../i18n';

type Still = {
  id: string;
  dateTaken: string;
  src: string;
  alt: {
    en: string;
    ja: string;
  };
  tags: string[];
  orientation?: 'portrait';
  cropMode?: 'zoom';
};

const tagOrder = ['event', 'food', 'doc', 'outdoors', 'indoors', 'commercial'];

const stills: Still[] = [
  {
    id: 'sydney-harbour-2026-09-15',
    dateTaken: '2026-09-15',
    src: '/Photo Album 1 - 01.jpg',
    alt: { en: 'Sydney Harbour, September 15, 2026', ja: 'Sydney Harbour, 2026年9月15日' },
    tags: ['outdoors'],
  },
  {
    id: 'aigamo-2026-06-26',
    dateTaken: '2026-06-26',
    src: '/aigamod1.png',
    alt: { en: 'Aigamo Documentary, June 26, 2026', ja: 'Aigamo Documentary, 2026年6月26日' },
    tags: ['outdoors', 'doc'],
  },
  {
    id: 'kuro-sydney-2026-04-19-01',
    dateTaken: '2026-04-19',
    src: '/Kuro1.jpg',
    alt: { en: 'Kuro Bar & Dining, Sydney, April 19, 2026', ja: 'Kuro Bar & Dining, Sydney, 2026年4月19日' },
    tags: ['food', 'indoors', 'commercial'],
  },
  {
    id: 'jsa-gm1-2026-09-15-010',
    dateTaken: '2026-09-15',
    src: '/JSA GM1 - 010.jpg',
    alt: { en: 'JSA GM1, September 15, 2026', ja: 'JSA GM1, 2026年9月15日' },
    tags: ['event', 'indoors'],
  },
  {
    id: 'kyodai-01',
    dateTaken: '2026-09-19',
    src: '/Kyodai1 - 01.jpg',
    alt: { en: 'Kyodai event, photo 01', ja: 'Kyodaiイベント、写真01' },
    tags: ['event', 'indoors'],
  },
  {
    id: 'hoka-2026-03-15-01',
    dateTaken: '2026-03-15',
    src: '/hokastill1.png',
    alt: { en: 'HOKA Spec Ad, March 15, 2026', ja: 'HOKA Spec Ad, 2026年3月15日' },
    tags: ['outdoors', 'commercial'],
  },
  {
    id: 'mountain-overlook-2026-08-22',
    dateTaken: '2026-08-22',
    src: '/Still 2026-08-22 000904_2.1.1.jpg',
    alt: { en: 'Mountain Overlook, August 22, 2026', ja: 'Mountain Overlook, 2026年8月22日' },
    tags: ['outdoors'],
    orientation: 'portrait',
    cropMode: 'zoom',
  },
  {
    id: 'kyodai-07',
    dateTaken: '2026-09-19',
    src: '/Kyodai1 - 07.jpg',
    alt: { en: 'Kyodai event, photo 07', ja: 'Kyodaiイベント、写真07' },
    tags: ['event', 'indoors'],
  },
  {
    id: 'kuro-sydney-2026-04-19-02',
    dateTaken: '2026-04-19',
    src: '/Kuro2.jpg',
    alt: { en: 'Kuro Bar & Dining, Sydney, April 19, 2026', ja: 'Kuro Bar & Dining, Sydney, 2026年4月19日' },
    tags: ['food', 'indoors', 'commercial'],
  },
  {
    id: 'jsa-gm1-2026-09-15-014',
    dateTaken: '2026-09-15',
    src: '/JSA GM1 - 014.jpg',
    alt: { en: 'JSA GM1, September 15, 2026', ja: 'JSA GM1, 2026年9月15日' },
    tags: ['event', 'indoors'],
  },
  {
    id: 'kyodai-09',
    dateTaken: '2026-09-19',
    src: '/Kyodai1 - 09.jpg',
    alt: { en: 'Kyodai event, photo 09', ja: 'Kyodaiイベント、写真09' },
    tags: ['event', 'indoors'],
  },
  {
    id: 'aigamo-2026-07-26',
    dateTaken: '2026-07-26',
    src: '/Still 2026-07-26 161432_1.1.1.jpg',
    alt: { en: 'Aigamo Documentary, July 26, 2026', ja: 'Aigamo Documentary, 2026年7月26日' },
    tags: ['outdoors', 'doc'],
  },
  {
    id: 'classroom-2026-09-03',
    dateTaken: '2026-09-03',
    src: '/Photo Album 1 - 03.jpg',
    alt: { en: 'Classroom, September 3, 2026', ja: 'Classroom, 2026年9月3日' },
    tags: ['event', 'indoors'],
    orientation: 'portrait',
  },
  {
    id: 'unknown-location-2026-08-22',
    dateTaken: '2026-08-22',
    src: '/Still 2026-08-22 003814_1.19.1.jpg',
    alt: { en: 'Unknown Location, August 22, 2026', ja: 'Unknown Location, 2026年8月22日' },
    tags: ['outdoors'],
    orientation: 'portrait',
  },
  {
    id: 'katoomba-falls-2026-01-29-01',
    dateTaken: '2026-01-29',
    src: '/still12.png',
    alt: { en: 'Katoomba Falls, January 29, 2026', ja: 'Katoomba Falls, 2026年1月29日' },
    tags: ['outdoors'],
    orientation: 'portrait',
    cropMode: 'zoom',
  },
  {
    id: 'hoka-2026-03-15-02',
    dateTaken: '2026-03-15',
    src: '/hokastill2.png',
    alt: { en: 'HOKA Spec Ad, March 15, 2026', ja: 'HOKA Spec Ad, 2026年3月15日' },
    tags: ['outdoors', 'commercial'],
  },
  {
    id: 'kyodai-10',
    dateTaken: '2026-09-19',
    src: '/Kyodai1 - 10.jpg',
    alt: { en: 'Kyodai event, photo 10', ja: 'Kyodaiイベント、写真10' },
    tags: ['event', 'indoors'],
  },
  {
    id: 'katoomba-falls-2026-01-29-02',
    dateTaken: '2026-01-29',
    src: '/still13.png',
    alt: { en: 'Katoomba Falls, January 29, 2026', ja: 'Katoomba Falls, 2026年1月29日' },
    tags: ['outdoors'],
    orientation: 'portrait',
    cropMode: 'zoom',
  },
  {
    id: 'kuro-sydney-2026-04-19-03',
    dateTaken: '2026-04-19',
    src: '/Kuro3.jpg',
    alt: { en: 'Kuro Bar & Dining, Sydney, April 19, 2026', ja: 'Kuro Bar & Dining, Sydney, 2026年4月19日' },
    tags: ['food', 'indoors', 'commercial'],
  },
  {
    id: 'mountain-trail-2026-08-22',
    dateTaken: '2026-08-22',
    src: '/Still 2026-08-22 010811_4.1.1.jpg',
    alt: { en: 'Mountain Trail, August 22, 2026', ja: 'Mountain Trail, 2026年8月22日' },
    tags: ['outdoors'],
    orientation: 'portrait',
    cropMode: 'zoom',
  },
];

const tagLabels = ['all', ...tagOrder.filter((tag) => stills.some((still) => still.tags.includes(tag)))];

const formatStillDate = (dateTaken: string) => {
  const [year, month, day] = dateTaken.split('-');

  return `${Number(month)}/${Number(day)}/${year}`;
};

const formatStillTags = (still: Still) =>
  [...still.tags].sort((a, b) => tagOrder.indexOf(a) - tagOrder.indexOf(b)).join(' / ');

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

const floatTransforms = [
  { rotate: '-4deg', delay: '-0.2s', floatX: '8px', floatY: '15px' },
  { rotate: '2.4deg', delay: '-1.6s', floatX: '-12px', floatY: '10px' },
  { rotate: '-1.8deg', delay: '-2.9s', floatX: '7px', floatY: '-13px' },
  { rotate: '3deg', delay: '-4.1s', floatX: '-8px', floatY: '-10px' },
  { rotate: '-2.5deg', delay: '-0.9s', floatX: '13px', floatY: '7px' },
  { rotate: '2.6deg', delay: '-3.4s', floatX: '-7px', floatY: '17px' },
  { rotate: '-2.2deg', delay: '-2.2s', floatX: '10px', floatY: '-8px' },
  { rotate: '3.8deg', delay: '-5s', floatX: '-13px', floatY: '12px' },
  { rotate: '-3.2deg', delay: '-1.1s', floatX: '5px', floatY: '18px' },
  { rotate: '2deg', delay: '-3.8s', floatX: '-10px', floatY: '-7px' },
];

const getFloatStyle = (index: number) => {
  const transform = floatTransforms[index % floatTransforms.length];

  return {
    '--float-rotate': transform.rotate,
    '--float-delay': transform.delay,
    '--float-x': transform.floatX,
    '--float-y': transform.floatY,
  } as React.CSSProperties;
};

const getTileClassName = (still: Still) =>
  [
    'stills-tile',
    still.orientation === 'portrait' ? 'stills-tile--portrait' : '',
  ]
    .filter(Boolean)
    .join(' ');

const Stills: React.FC = () => {
  const { language } = useLanguage();
  const [selectedTag, setSelectedTag] = useState('all');
  const [activeStillId, setActiveStillId] = useState<string | null>(null);
  const galleryRef = useRef<HTMLElement>(null);

  const filteredStills = useMemo(
    () => stills.filter((still) => selectedTag === 'all' || still.tags.includes(selectedTag)),
    [selectedTag],
  );

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    // Measure the untransformed photo height so floating never changes layout.
    const sizeItem = (tile: HTMLElement) => {
      const gap = parseFloat(getComputedStyle(gallery).getPropertyValue('--stills-row-gap'));
      tile.parentElement!.style.gridRowEnd = `span ${Math.ceil(tile.offsetHeight + gap)}`;
    };
    const observer = new ResizeObserver((entries) => {
      entries.forEach(({ target }) => sizeItem(target as HTMLElement));
    });
    gallery.querySelectorAll<HTMLElement>('.stills-tile').forEach((tile) => {
      sizeItem(tile);
      observer.observe(tile);
    });

    return () => observer.disconnect();
  }, [filteredStills]);

  const activeIndex = Math.max(0, filteredStills.findIndex((still) => still.id === activeStillId));

  const activeStill = activeStillId ? filteredStills[activeIndex] : null;

  useGalleryScrollLock(Boolean(activeStill));

  const setFilter = (tag: string) => {
    setSelectedTag(tag);
    setActiveStillId(null);
  };

  const moveCarousel = useCallback((direction: -1 | 1) => {
    if (!filteredStills.length) {
      return;
    }

    const nextIndex = (activeIndex + direction + filteredStills.length) % filteredStills.length;
    setActiveStillId(filteredStills[nextIndex].id);
  }, [activeIndex, filteredStills]);

  const { isMobile, swipeHandlers } = useGalleryNavigation(moveCarousel);

  const selectStill = (stillId: string) => {
    setActiveStillId(stillId);
  };

  useEffect(() => {
    if (!activeStill) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveStillId(null);
      }

      if (event.key === 'ArrowLeft') {
        moveCarousel(-1);
      }

      if (event.key === 'ArrowRight') {
        moveCarousel(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeStill, moveCarousel]);

  const copy =
    language === 'ja'
      ? {
          filterLabel: 'タグ',
          all: 'all',
          previous: '前へ',
          next: '次へ',
          close: '閉じる',
        }
      : {
          filterLabel: 'Tags',
          all: 'all',
          previous: 'Previous still',
          next: 'Next still',
          close: 'Close carousel',
        };

  return (
    <main className="page page--stills">
      <div className="stills-stars" aria-hidden="true" />
      <div className="page-content page-content--stills">
        <header className="stills-header">
          <label className="stills-filter-select">
            <span>{copy.filterLabel}</span>
            <select value={selectedTag} onChange={(event) => setFilter(event.target.value)}>
              {tagLabels.map((tag) => (
                <option key={tag} value={tag}>
                  {tag === 'all' ? copy.all : tag}
                </option>
              ))}
            </select>
          </label>
        </header>

        <section ref={galleryRef} className="stills-field" aria-label={language === 'ja' ? 'スチル一覧' : 'Still photographs'}>
          {filteredStills.map((still, index) => (
            <div className="stills-item" key={still.id}>
              <button
                type="button"
                className={getTileClassName(still)}
                style={getFloatStyle(index)}
                onClick={() => selectStill(still.id)}
              >
                <img width={still.orientation === 'portrait' ? 800 : 1600} height={still.orientation === 'portrait' ? 1000 : 1050} src={still.src} alt={still.alt[language]} loading={index < 4 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
                <span className="stills-tile__meta">
                  <strong>{formatStillDate(still.dateTaken)}</strong>
                  <small>{formatStillTags(still)}</small>
                </span>
              </button>
            </div>
          ))}
        </section>

        {activeStill && createPortal(
          <section className="stills-carousel" aria-label="Featured still carousel" aria-modal="true" role="dialog">
            <button
              type="button"
              className="stills-carousel__backdrop"
              onClick={() => setActiveStillId(null)}
              aria-label={copy.close}
            />
            <button
              type="button"
              className="stills-carousel__close"
              onClick={() => setActiveStillId(null)}
              aria-label={copy.close}
            >
              ×
            </button>
            <button
              type="button"
              className="stills-carousel__control stills-carousel__control--prev"
              onClick={() => moveCarousel(-1)}
              aria-label={copy.previous}
            >
              ‹
            </button>
            <span className="gallery-count" aria-live="polite">{activeIndex + 1} / {filteredStills.length}</span>
            <div className="stills-carousel__stage" {...swipeHandlers}>
              {filteredStills.map((still, index) => {
                const offset = getCircularOffset(index, activeIndex, filteredStills.length);
                const isVisible = isMobile ? offset === 0 : Math.abs(offset) <= 2;
                if (!isVisible) return null;

                return (
                  <button
                    key={still.id}
                    type="button"
                    className={`stills-carousel__card${offset === 0 ? ' stills-carousel__card--active' : ''}${still.orientation === 'portrait' ? ' stills-carousel__card--portrait' : ''}${still.cropMode === 'zoom' ? ' stills-carousel__card--zoom-crop' : ''}`}
                    style={{ '--still-offset': offset } as React.CSSProperties}
                    onClick={() => selectStill(still.id)}
                    aria-label={still.alt[language]}
                  >
                    <img src={still.src} alt={still.alt[language]} draggable={false} />
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              className="stills-carousel__control stills-carousel__control--next"
              onClick={() => moveCarousel(1)}
              aria-label={copy.next}
            >
              ›
            </button>
          </section>,
          document.body,
        )}

        <SiteFooter />
      </div>
    </main>
  );
};

export default Stills;
