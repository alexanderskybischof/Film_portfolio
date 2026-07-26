import type { Language, LocalizedText } from '../i18n';

export type WorkCategoryKey = 'reel' | 'commercial-work' | 'short-films' | 'personal';

export type WorkProject = {
  slug: string;
  title: LocalizedText;
  description?: LocalizedText;
  videoType: 'youtube' | 'vimeo' | 'local';
  videoUrl: string;
  secondaryVideoUrl?: string;
  videos?: Array<{
    title: LocalizedText;
    videoType: 'youtube' | 'vimeo' | 'local';
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
  cardImageObjectPosition?: string;
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
    slug: 'short-films',
    title: localized('Short Films', '短編映画'),
    cardImage: `${assetPrefix}/Still 2026-07-26 161432_1.1.1.jpg`,
    cardImageAlt: localized('Short films preview', '短編映画のプレビュー'),
    cardImageObjectPosition: 'center 34%',
    projects: [
      {
        slug: 'aigamo-documentary',
        title: localized('Aigamo Documentary (2027)', 'アイガモ・ドキュメンタリー (2027)'),
        description: localized(
          'The Aigamo Method is a Japanese regenerative agricultural technique where ducks are used to fertilize rice fields and eliminate pests. Through stories of Vermont farmer Erik Andrus and the international “World Duck Family,” the film explores the challenges and rewards of pursuing an unconventional path in a modern food system driven by convenience. Structured around the seasonal cycle of rice farming, the documentary portrays how shared values and purpose can connect people across cultures.',
          'アイガモ農法は、アヒルを使って田んぼに肥料を与え、害虫を取り除く日本の再生型農業の手法です。バーモント州の農家エリック・アンドラスと国際的な「ワールド・ダック・ファミリー」の物語を通して、この作品は、利便性に支配された現代の食料システムの中で、型にはまらない道を選ぶことの難しさと喜びを描きます。稲作の季節の循環に沿って構成されたこのドキュメンタリーは、価値観と目的の共有が文化を越えて人々を結びつける様子を映し出します。',
        ),
        videoType: 'vimeo',
        videoUrl: 'https://vimeo.com/1213108065?share=copy&fl=sv&fe=ci',
        thumbnail: {
          src: `${assetPrefix}/Still 2026-07-26 162114_2.8.1.jpg`,
          alt: localized('Aigamo Documentary preview', 'アイガモ・ドキュメンタリーのプレビュー'),
          type: 'image',
          objectPosition: 'center 16%',
        },
        stillFrames: [
          {
            src: `${assetPrefix}/aigamod1.png`,
            alt: localized('Aigamo Documentary still frame 1', 'アイガモ・ドキュメンタリーのスチル 1'),
          },
          {
            src: `${assetPrefix}/aigamodoc2.png`,
            alt: localized('Aigamo Documentary still frame 2', 'アイガモ・ドキュメンタリーのスチル 2'),
          },
          {
            src: `${assetPrefix}/aigamodo3.png`,
            alt: localized('Aigamo Documentary still frame 3', 'アイガモ・ドキュメンタリーのスチル 3'),
          },
          {
            src: `${assetPrefix}/aigamodoc4.png`,
            alt: localized('Aigamo Documentary still frame 4', 'アイガモ・ドキュメンタリーのスチル 4'),
          },
          {
            src: `${assetPrefix}/Still+2026-07-18+234828_2.1.1.webp`,
            alt: localized('Aigamo Documentary still frame 5', 'アイガモ・ドキュメンタリーのスチル 5'),
          },
          {
            src: `${assetPrefix}/Still+2026-07-18+234828_2.3.2.webp`,
            alt: localized('Aigamo Documentary still frame 6', 'アイガモ・ドキュメンタリーのスチル 6'),
          },
          {
            src: `${assetPrefix}/Still+2026-07-18+234828_3.6.1.webp`,
            alt: localized('Aigamo Documentary still frame 7', 'アイガモ・ドキュメンタリーのスチル 7'),
          },
          {
            src: `${assetPrefix}/Still+2026-07-18+235445_1.1.1.webp`,
            alt: localized('Aigamo Documentary still frame 8', 'アイガモ・ドキュメンタリーのスチル 8'),
          },
          {
            src: `${assetPrefix}/Still 2026-07-26 161432_1.1.1.jpg`,
            alt: localized('Aigamo Documentary still frame 9', 'アイガモ・ドキュメンタリーのスチル 9'),
          },
          {
            src: `${assetPrefix}/Still 2026-07-26 162114_2.8.1.jpg`,
            alt: localized('Aigamo Documentary still frame 10', 'アイガモ・ドキュメンタリーのスチル 10'),
          },
          {
            src: `${assetPrefix}/Still 2026-07-26 162114_2.15.1.jpg`,
            alt: localized('Aigamo Documentary still frame 11', 'アイガモ・ドキュメンタリーのスチル 11'),
          },
          {
            src: `${assetPrefix}/Still 2026-07-26 162114_2.26.1.jpg`,
            alt: localized('Aigamo Documentary still frame 12', 'アイガモ・ドキュメンタリーのスチル 12'),
          },
        ],
      },
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

export const getVimeoEmbedUrl = (videoUrl: string) => {
  try {
    const url = new URL(videoUrl);
    const videoId = url.pathname.split('/').filter(Boolean)[0];

    if (!videoId) {
      return '';
    }

    return `https://player.vimeo.com/video/${videoId}`;
  } catch {
    return '';
  }
};
