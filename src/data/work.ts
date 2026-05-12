import type { Language, LocalizedText } from '../i18n';

export type WorkCategoryKey = 'reel' | 'commercial-work' | 'short-films' | 'personal';

export type WorkProject = {
  slug: string;
  title: LocalizedText;
  description?: LocalizedText;
  videoType: 'youtube' | 'local';
  videoUrl: string;
  secondaryVideoUrl?: string;
  videos?: Array<{
    title: LocalizedText;
    videoType: 'youtube' | 'local';
    videoUrl?: string;
  }>;
  thumbnail: {
    src?: string;
    alt: LocalizedText;
    type: 'image' | 'video';
    objectPosition?: string;
  };
  stillFrames: Array<{
    src?: string;
    alt: LocalizedText;
    label?: LocalizedText;
    solidBackground?: boolean;
  }>;
};

export type WorkCategory = {
  slug: WorkCategoryKey;
  title: LocalizedText;
  cardImage?: string;
  cardImageAlt: LocalizedText;
  cardImageType?: 'image' | 'video';
  description?: LocalizedText;
  reelVideoUrl?: string;
  projects: WorkProject[];
};

const assetPrefix = process.env.PUBLIC_URL || '';

const localized = (en: string, ja: string): LocalizedText => ({ en, ja });

export const getText = (text: LocalizedText | undefined, language: Language) => (text ? text[language] : '');

export const workCategories: WorkCategory[] = [
  {
    slug: 'reel',
    title: localized('Reel', 'リール'),
    cardImage: `${assetPrefix}/reel.png`,
    cardImageAlt: localized('Reel preview', 'リールのプレビュー'),
    cardImageType: 'image',
    reelVideoUrl: `${assetPrefix}/rel.mp4`,
    projects: [],
  },
  {
    slug: 'commercial-work',
    title: localized('Commercial Work', 'コマーシャル作品'),
    cardImage: `${assetPrefix}/hokaspec.png`,
    cardImageAlt: localized('Commercial work preview', 'コマーシャル作品のプレビュー'),
    projects: [
      {
        slug: 'hoka-spec-ad',
        title: localized('Hoka Spec Ad', 'HOKA スペック広告'),
        description: undefined,
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=-YG1HqFnbuU',
        secondaryVideoUrl: 'https://www.youtube.com/watch?v=yqnsDNS4VFY',
        thumbnail: {
          src: `${assetPrefix}/hokaspec.png`,
          alt: localized('Hoka Spec Ad preview', 'HOKA スペック広告のプレビュー'),
          type: 'image',
        },
        stillFrames: [
          {
            src: `${assetPrefix}/hokastill0.png`,
            alt: localized('Hoka Spec Ad still frame 1', 'HOKA スペック広告のスチル 1'),
          },
          {
            src: `${assetPrefix}/hokastill1.png`,
            alt: localized('Hoka Spec Ad still frame 2', 'HOKA スペック広告のスチル 2'),
          },
          {
            src: `${assetPrefix}/hokastill2.png`,
            alt: localized('Hoka Spec Ad still frame 3', 'HOKA スペック広告のスチル 3'),
          },
          {
            src: `${assetPrefix}/hokastill3.png`,
            alt: localized('Hoka Spec Ad still frame 4', 'HOKA スペック広告のスチル 4'),
          },
        ],
      },
      {
        slug: 'kuro-kahii-sydney',
        title: localized('Kuro Bar & Dining', 'Kuro Bar & Dining'),
        description: localized(
          'The following videos are part of a series of five promotional pieces created for Kuro Bar & Dining. They were designed for use in live venue advertising, with a focus on capturing the atmosphere and visual appeal of the space.',
          '以下の映像は、Kuro Bar & Dining のために制作した5本のプロモーション作品のシリーズです。会場内広告での使用を想定し、空間の雰囲気とビジュアルの魅力を捉えることに重点を置いています。',
        ),
        videoType: 'local',
        videoUrl: '',
        videos: [
          { title: localized('Short Video 1', 'ショート映像 1'), videoType: 'youtube', videoUrl: 'https://youtu.be/m3VC7YkEhAo' },
          { title: localized('Short Video 2', 'ショート映像 2'), videoType: 'youtube', videoUrl: 'https://youtu.be/tvUu-WB8w8U' },
          { title: localized('Short Video 3', 'ショート映像 3'), videoType: 'youtube', videoUrl: 'https://youtu.be/8Y9W5-dlf4M' },
          { title: localized('Short Video 4', 'ショート映像 4'), videoType: 'youtube', videoUrl: 'https://youtu.be/TFmQyV8exds' },
          { title: localized('Short Video 5', 'ショート映像 5'), videoType: 'youtube', videoUrl: 'https://youtu.be/INj0UrsEhxk' },
        ],
        thumbnail: {
          src: `${assetPrefix}/kurostill_2.1.1.jpg`,
          alt: localized('Kuro Bar & Dining preview', 'Kuro Bar & Dining のプレビュー'),
          type: 'image',
          objectPosition: 'center 97%',
        },
        stillFrames: [
          {
            src: `${assetPrefix}/Kuro1.jpg`,
            alt: localized('Kuro Bar & Dining photo 1', 'Kuro Bar & Dining の写真 1'),
          },
          {
            src: `${assetPrefix}/Kuro2.jpg`,
            alt: localized('Kuro Bar & Dining photo 2', 'Kuro Bar & Dining の写真 2'),
          },
          {
            src: `${assetPrefix}/Kuro3.jpg`,
            alt: localized('Kuro Bar & Dining photo 3', 'Kuro Bar & Dining の写真 3'),
          },
          {
            src: `${assetPrefix}/Kuro4.jpg`,
            alt: localized('Kuro Bar & Dining photo 4', 'Kuro Bar & Dining の写真 4'),
          },
          {
            src: `${assetPrefix}/Kuro4.5.jpg`,
            alt: localized('Kuro Bar & Dining photo 5', 'Kuro Bar & Dining の写真 5'),
          },
          {
            src: `${assetPrefix}/Kuro5.jpg`,
            alt: localized('Kuro Bar & Dining photo 6', 'Kuro Bar & Dining の写真 6'),
          },
          {
            src: `${assetPrefix}/Kuro6.jpg`,
            alt: localized('Kuro Bar & Dining photo 7', 'Kuro Bar & Dining の写真 7'),
          },
          {
            src: `${assetPrefix}/Kuro7.jpg`,
            alt: localized('Kuro Bar & Dining photo 8', 'Kuro Bar & Dining の写真 8'),
          },
          {
            src: `${assetPrefix}/Kuro8.jpg`,
            alt: localized('Kuro Bar & Dining photo 9', 'Kuro Bar & Dining の写真 9'),
          },
        ],
      },
      {
        slug: 'kahii',
        title: localized('Kahii', 'Kahii'),
        description: localized(
          "Short Videos produced for Kahii's social media accounts",
          'Kahii のソーシャルメディア向けに制作したショート映像です。',
        ),
        videoType: 'local',
        videoUrl: '',
        videos: [
          { title: localized('Short Video 1', 'ショート映像 1'), videoType: 'youtube', videoUrl: 'https://youtu.be/KXBljh_hEgc' },
          { title: localized('Short Video 2', 'ショート映像 2'), videoType: 'youtube', videoUrl: 'https://youtube.com/shorts/6nZLt6vMZhI?feature=share' },
        ],
        thumbnail: {
          src: `${assetPrefix}/kahiistill.jpg`,
          alt: localized('Kahii preview', 'Kahii のプレビュー'),
          type: 'image',
        },
        stillFrames: [],
      },
      {
        slug: 'bu-debate',
        title: localized('BU Debate', 'BU ディベート'),
        description: undefined,
        videoType: 'youtube',
        videoUrl: 'https://youtu.be/c9SvGeHA3vY',
        thumbnail: {
          src: `${assetPrefix}/debatetitlecard.png`,
          alt: localized('BU Debate preview', 'BU ディベートのプレビュー'),
          type: 'image',
        },
        stillFrames: [],
      },
    ],
  },
  {
    slug: 'short-films',
    title: localized('Short Films', '短編映画'),
    cardImage: `${assetPrefix}/hd1.jpg`,
    cardImageAlt: localized('Short films preview', '短編映画のプレビュー'),
    projects: [
      {
        slug: 'hungry-drudge',
        title: localized('Hungry Drudge', 'Hungry Drudge'),
        description: undefined,
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=P5pREr7TDWw',
        thumbnail: {
          src: `${assetPrefix}/hd1.jpg`,
          alt: localized('Hungry Drudge preview', 'Hungry Drudge のプレビュー'),
          type: 'image',
        },
        stillFrames: [
          {
            src: `${assetPrefix}/hungrydrudgetitle.jpg`,
            alt: localized('Hungry Drudge still frame 1', 'Hungry Drudge のスチル 1'),
          },
          {
            src: `${assetPrefix}/hd2.jpg`,
            alt: localized('Hungry Drudge still frame 2', 'Hungry Drudge のスチル 2'),
          },
          {
            src: `${assetPrefix}/hd3.jpg`,
            alt: localized('Hungry Drudge still frame 3', 'Hungry Drudge のスチル 3'),
          },
          {
            src: `${assetPrefix}/hd4.jpg`,
            alt: localized('Hungry Drudge still frame 4', 'Hungry Drudge のスチル 4'),
          },
        ],
      },
    ],
  },
  {
    slug: 'personal',
    title: localized('Personal', '個人作品'),
    cardImage: `${assetPrefix}/crossingjapan.png`,
    cardImageAlt: localized('Personal work preview', '個人作品のプレビュー'),
    projects: [
      {
        slug: 'crossing-japan',
        title: localized('Crossing Japan', 'Crossing Japan'),
        description: undefined,
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=K52ULfZdbqI&t=86s',
        thumbnail: {
          src: `${assetPrefix}/crossingjapan.png`,
          alt: localized('Crossing Japan preview', 'Crossing Japan のプレビュー'),
          type: 'image',
        },
        stillFrames: [],
      },
    ],
  },
];

export const getCategoryBySlug = (slug?: string) =>
  workCategories.find((category) => category.slug === slug);

export const getProjectByCategoryAndSlug = (categorySlug?: string, projectSlug?: string) => {
  const category = getCategoryBySlug(categorySlug as WorkCategoryKey | undefined);

  if (!category) {
    return null;
  }

  const project = category.projects.find((item) => item.slug === projectSlug);

  if (!project) {
    return null;
  }

  return { category, project };
};

export const getYoutubeEmbedUrl = (videoUrl: string) => {
  try {
    const url = new URL(videoUrl);
    const shortCode = url.hostname.includes('youtu.be')
      ? url.pathname.replace('/', '')
      : url.searchParams.get('v');

    if (!shortCode) {
      return '';
    }

    return `https://www.youtube.com/embed/${shortCode}?enablejsapi=1`;
  } catch {
    return '';
  }
};
