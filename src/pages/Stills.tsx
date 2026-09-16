import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import SiteFooter from '../components/SiteFooter';
import { useLanguage } from '../i18n';

type Still = {
  id: string;
  title: {
    en: string;
    ja: string;
  };
  dateTaken: string;
  src: string;
  alt: {
    en: string;
    ja: string;
  };
  tags: string[];
  orientation?: 'portrait' | 'landscape';
  cropMode?: 'zoom';
};

const tagOrder = ['event', 'food', 'doc', 'outdoors', 'indoors', 'commercial'];

const stillDisplayOrder = [
  'sydney-harbour-2026-09-15',
  'aigamo-2026-06-26',
  'kuro-sydney-2026-04-19-01',
  'jsa-gm1-2026-09-15-010',
  'hoka-2026-03-15-01',
  'kuro-sydney-2026-04-19-02',
  'mountain-overlook-2026-08-22',
  'unknown-location-2024-06-28-01',
  'jsa-gm1-2026-09-15-014',
  'aigamo-2026-07-26',
  'classroom-2026-09-03',
  'unknown-location-2026-08-22',
  'katoomba-falls-2026-01-29-01',
  'hoka-2026-03-15-02',
  'katoomba-falls-2026-01-29-02',
  'kuro-sydney-2026-04-19-03',
  'mountain-trail-2026-08-22',
];

const stills: Still[] = [


  {
    id: 'unknown-location-2024-06-28-02',
    title: { en: 'Unknown Location, June 28, 2024', ja: 'Unknown Location, 2024年6月28日' },
    dateTaken: '2024-06-28',
    src: '/DSCF0065.JPG',
    alt: { en: 'Unknown Location, June 28, 2024', ja: 'Unknown Location, 2024年6月28日' },
    tags: ['outdoors', 'doc'],
  },
  {
    id: 'katoomba-falls-2026-01-29-01',
    title: { en: 'Katoomba Falls, January 29, 2026', ja: 'Katoomba Falls, 2026年1月29日' },
    dateTaken: '2026-01-29',
    src: '/still12.png',
    alt: { en: 'Katoomba Falls, January 29, 2026', ja: 'Katoomba Falls, 2026年1月29日' },
    tags: ['outdoors'],
    orientation: 'portrait',
    cropMode: 'zoom',
  },
  {
    id: 'katoomba-falls-2026-01-29-02',
    title: { en: 'Katoomba Falls, January 29, 2026', ja: 'Katoomba Falls, 2026年1月29日' },
    dateTaken: '2026-01-29',
    src: '/still13.png',
    alt: { en: 'Katoomba Falls, January 29, 2026', ja: 'Katoomba Falls, 2026年1月29日' },
    tags: ['outdoors'],
    orientation: 'portrait',
    cropMode: 'zoom',
  },
  {
    id: 'hoka-2026-03-15-01',
    title: { en: 'HOKA Spec Ad, March 15, 2026', ja: 'HOKA Spec Ad, 2026年3月15日' },
    dateTaken: '2026-03-15',
    src: '/hokastill1.png',
    alt: { en: 'HOKA Spec Ad, March 15, 2026', ja: 'HOKA Spec Ad, 2026年3月15日' },
    tags: ['outdoors', 'commercial'],
  },
  {
    id: 'hoka-2026-03-15-02',
    title: { en: 'HOKA Spec Ad, March 15, 2026', ja: 'HOKA Spec Ad, 2026年3月15日' },
    dateTaken: '2026-03-15',
    src: '/hokastill2.png',
    alt: { en: 'HOKA Spec Ad, March 15, 2026', ja: 'HOKA Spec Ad, 2026年3月15日' },
    tags: ['outdoors', 'commercial'],
  },
  {
    id: 'kuro-sydney-2026-04-19-01',
    title: { en: 'Kuro Bar & Dining, Sydney, April 19, 2026', ja: 'Kuro Bar & Dining, Sydney, 2026年4月19日' },
    dateTaken: '2026-04-19',
    src: '/Kuro1.jpg',
    alt: { en: 'Kuro Bar & Dining, Sydney, April 19, 2026', ja: 'Kuro Bar & Dining, Sydney, 2026年4月19日' },
    tags: ['food', 'indoors', 'commercial'],
  },
  {
    id: 'kuro-sydney-2026-04-19-02',
    title: { en: 'Kuro Bar & Dining, Sydney, April 19, 2026', ja: 'Kuro Bar & Dining, Sydney, 2026年4月19日' },
    dateTaken: '2026-04-19',
    src: '/Kuro2.jpg',
    alt: { en: 'Kuro Bar & Dining, Sydney, April 19, 2026', ja: 'Kuro Bar & Dining, Sydney, 2026年4月19日' },
    tags: ['food', 'indoors', 'commercial'],
  },
  {
    id: 'kuro-sydney-2026-04-19-03',
    title: { en: 'Kuro Bar & Dining, Sydney, April 19, 2026', ja: 'Kuro Bar & Dining, Sydney, 2026年4月19日' },
    dateTaken: '2026-04-19',
    src: '/Kuro3.jpg',
    alt: { en: 'Kuro Bar & Dining, Sydney, April 19, 2026', ja: 'Kuro Bar & Dining, Sydney, 2026年4月19日' },
    tags: ['food', 'indoors', 'commercial'],
  },
  {
    id: 'aigamo-2026-06-26',
    title: { en: 'Aigamo Documentary, June 26, 2026', ja: 'Aigamo Documentary, 2026年6月26日' },
    dateTaken: '2026-06-26',
    src: '/aigamod1.png',
    alt: { en: 'Aigamo Documentary, June 26, 2026', ja: 'Aigamo Documentary, 2026年6月26日' },
    tags: ['outdoors', 'doc'],
  },
  {
    id: 'aigamo-2026-07-18',
    title: { en: 'Aigamo Documentary, July 18, 2026', ja: 'Aigamo Documentary, 2026年7月18日' },
    dateTaken: '2026-07-18',
    src: '/Still+2026-07-18+234828_2.3.2.webp',
    alt: { en: 'Aigamo Documentary, July 18, 2026', ja: 'Aigamo Documentary, 2026年7月18日' },
    tags: ['outdoors', 'doc'],
  },
  {
    id: 'aigamo-2026-07-26',
    title: { en: 'Aigamo Documentary, July 26, 2026', ja: 'Aigamo Documentary, 2026年7月26日' },
    dateTaken: '2026-07-26',
    src: '/Still 2026-07-26 161432_1.1.1.jpg',
    alt: { en: 'Aigamo Documentary, July 26, 2026', ja: 'Aigamo Documentary, 2026年7月26日' },
    tags: ['outdoors', 'doc'],
  },
  {
    id: 'sydney-harbour-2026-09-15',
    title: { en: 'Sydney Harbour, September 15, 2026', ja: 'Sydney Harbour, 2026年9月15日' },
    dateTaken: '2026-09-15',
    src: '/Photo Album 1 - 01.png',
    alt: { en: 'Sydney Harbour, September 15, 2026', ja: 'Sydney Harbour, 2026年9月15日' },
    tags: ['outdoors'],
  },

  {
    id: 'jsa-gm1-2026-09-15-010',
    title: { en: 'JSA GM1, September 15, 2026', ja: 'JSA GM1, 2026年9月15日' },
    dateTaken: '2026-09-15',
    src: '/JSA GM1 - 010.jpg',
    alt: { en: 'JSA GM1, September 15, 2026', ja: 'JSA GM1, 2026年9月15日' },
    tags: ['event', 'indoors'],
  },
  {
    id: 'jsa-gm1-2026-09-15-014',
    title: { en: 'JSA GM1, September 15, 2026', ja: 'JSA GM1, 2026年9月15日' },
    dateTaken: '2026-09-15',
    src: '/JSA GM1 - 014.jpg',
    alt: { en: 'JSA GM1, September 15, 2026', ja: 'JSA GM1, 2026年9月15日' },
    tags: ['event', 'indoors'],
  },
  {
    id: 'classroom-2026-09-03',
    title: { en: 'Classroom, September 3, 2026', ja: 'Classroom, 2026年9月3日' },
    dateTaken: '2026-09-03',
    src: '/Photo Album 1 - 03.jpg',
    alt: { en: 'Classroom, September 3, 2026', ja: 'Classroom, 2026年9月3日' },
    tags: ['event', 'indoors'],
    orientation: 'portrait',
  },
  {
    id: 'jeff-karate-2026-08-22',
    title: { en: 'Karate Class, August 22, 2026', ja: 'Karate Class, 2026年8月22日' },
    dateTaken: '2026-08-22',
    src: '/Jeff Karate Class 8.22 - 00000029.jpg',
    alt: { en: 'Karate Class, August 22, 2026', ja: 'Karate Class, 2026年8月22日' },
    tags: ['event', 'indoors', 'doc'],
    orientation: 'portrait',
  },
  {
    id: 'mountain-overlook-2026-08-22',
    title: { en: 'Mountain Overlook, August 22, 2026', ja: 'Mountain Overlook, 2026年8月22日' },
    dateTaken: '2026-08-22',
    src: '/Still 2026-08-22 000904_2.1.1.jpg',
    alt: { en: 'Mountain Overlook, August 22, 2026', ja: 'Mountain Overlook, 2026年8月22日' },
    tags: ['outdoors'],
    orientation: 'portrait',
    cropMode: 'zoom',
  },
  {
    id: 'mountain-trail-2026-08-22',
    title: { en: 'Mountain Trail, August 22, 2026', ja: 'Mountain Trail, 2026年8月22日' },
    dateTaken: '2026-08-22',
    src: '/Still 2026-08-22 010811_4.1.1.jpg',
    alt: { en: 'Mountain Trail, August 22, 2026', ja: 'Mountain Trail, 2026年8月22日' },
    tags: ['outdoors'],
    orientation: 'portrait',
    cropMode: 'zoom',
  },
  {
    id: 'unknown-location-2026-08-22',
    title: { en: 'Unknown Location, August 22, 2026', ja: 'Unknown Location, 2026年8月22日' },
    dateTaken: '2026-08-22',
    src: '/Still 2026-08-22 003814_1.19.1.jpg',
    alt: { en: 'Unknown Location, August 22, 2026', ja: 'Unknown Location, 2026年8月22日' },
    tags: ['outdoors'],
    orientation: 'portrait',
  },
];

const orderedStills = stillDisplayOrder
  .map((id) => stills.find((still) => still.id === id))
  .filter((still): still is Still => Boolean(still));

const formatStillDate = (dateTaken: string) => {
  const [year, month, day] = dateTaken.split('-');

  return `${Number(month)}/${Number(day)}/${year}`;
};

const formatStillTags = (still: Still) => {
  const tags = still.id.startsWith('katoomba-falls')
    ? still.tags.filter((tag) => tag !== 'doc')
    : still.tags;

  return [...tags].sort((a, b) => tagOrder.indexOf(a) - tagOrder.indexOf(b)).join(' / ');
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
    '--stills-reveal-delay': `${Math.min(index * 0.018, 0.72)}s`,
  } as React.CSSProperties;
};

const getTileClassName = (still: Still) =>
  [
    'stills-tile',
    still.orientation === 'portrait' ? 'stills-tile--portrait' : '',
    still.cropMode === 'zoom' ? 'stills-tile--zoom-crop' : '',
    still.id === 'jsa-gm1-2026-09-15-014' ? 'stills-tile--aquarium-corner' : '',
  ]
    .filter(Boolean)
    .join(' ');


const Stills: React.FC = () => {
  const { language } = useLanguage();
  const [selectedTag, setSelectedTag] = useState('all');
  const [activeStillId, setActiveStillId] = useState<string | null>(null);

  const tagLabels = useMemo(
    () => ['all', ...tagOrder.filter((tag) => stills.some((still) => still.tags.includes(tag)))],
    [],
  );
  const filteredStills = useMemo(
    () => orderedStills.filter((still) => selectedTag === 'all' || still.tags.includes(selectedTag)),
    [selectedTag],
  );

  const activeIndex = Math.max(0, filteredStills.findIndex((still) => still.id === activeStillId));

  const activeStill = activeStillId ? filteredStills[activeIndex] : null;

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

  const selectStill = (stillId: string) => {
    setActiveStillId(stillId);
  };

  useEffect(() => {
    if (!activeStill) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

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
      document.body.style.overflow = previousOverflow;
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

        <section className="stills-field" aria-label="Still placeholders">
          {filteredStills.map((still, index) => (
            <button
              key={still.id}
              type="button"
              className={getTileClassName(still)}
              style={getFloatStyle(index)}
              onClick={() => selectStill(still.id)}
            >
              <img src={still.src} alt={formatStillDate(still.dateTaken)} draggable={false} />
              <span className="stills-tile__meta">
                <strong>{formatStillDate(still.dateTaken)}</strong>
                <small>{formatStillTags(still)}</small>
              </span>
            </button>
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
            <div className="stills-carousel__stage">
              {filteredStills.map((still, index) => {
                const offset = getCircularOffset(index, activeIndex, filteredStills.length);
                const isVisible = Math.abs(offset) <= 2;

                return (
                  <button
                    key={still.id}
                    type="button"
                    className={`stills-carousel__card${offset === 0 ? ' stills-carousel__card--active' : ''}${still.orientation === 'portrait' ? ' stills-carousel__card--portrait' : ''}${still.cropMode === 'zoom' ? ' stills-carousel__card--zoom-crop' : ''}`}
                    style={{ '--still-offset': offset } as React.CSSProperties}
                    onClick={() => selectStill(still.id)}
                    aria-label={formatStillDate(still.dateTaken)}
                    aria-hidden={!isVisible}
                    tabIndex={isVisible ? 0 : -1}
                  >
                    <img src={still.src} alt={formatStillDate(still.dateTaken)} draggable={false} />
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
