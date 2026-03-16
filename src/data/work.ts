export type WorkCategoryKey = 'reel' | 'commercial-work' | 'short-films';

export type WorkProject = {
  slug: string;
  title: string;
  description?: string;
  videoType: 'youtube' | 'local';
  videoUrl: string;
  secondaryVideoUrl?: string;
  thumbnail: {
    src: string;
    alt: string;
    type: 'image' | 'video';
  };
  stillFrames: Array<{
    src: string;
    alt: string;
    solidBackground?: boolean;
  }>;
};

export type WorkCategory = {
  slug: WorkCategoryKey;
  title: string;
  cardImage: string;
  cardImageAlt: string;
  cardImageType?: 'image' | 'video';
  description?: string;
  reelVideoUrl?: string;
  projects: WorkProject[];
};

const assetPrefix = process.env.PUBLIC_URL || '';

export const workCategories: WorkCategory[] = [
  {
    slug: 'reel',
    title: 'Reel',
    cardImage: `${assetPrefix}/reel.png`,
    cardImageAlt: 'Reel preview',
    cardImageType: 'image',
    reelVideoUrl: `${assetPrefix}/rel.mp4`,
    projects: [],
  },
  {
    slug: 'commercial-work',
    title: 'Commercial Work',
    cardImage: `${assetPrefix}/hokaspec.png`,
    cardImageAlt: 'Commercial work preview',
    projects: [
      {
        slug: 'hoka-spec-ad',
        title: 'Hoka Spec Ad',
        description: '',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=-YG1HqFnbuU',
        secondaryVideoUrl: 'https://www.youtube.com/watch?v=yqnsDNS4VFY',
        thumbnail: {
          src: `${assetPrefix}/hokaspec.png`,
          alt: 'Hoka Spec Ad preview',
          type: 'image',
        },
        stillFrames: [
          {
            src: `${assetPrefix}/hokastill0.png`,
            alt: 'Hoka Spec Ad still frame 1',
          },
          {
            src: `${assetPrefix}/hokastill1.png`,
            alt: 'Hoka Spec Ad still frame 2',
          },
          {
            src: `${assetPrefix}/hokastill2.png`,
            alt: 'Hoka Spec Ad still frame 3',
          },
          {
            src: `${assetPrefix}/hokastill3.png`,
            alt: 'Hoka Spec Ad still frame 4',
          },
        ],
      },
      {
        slug: 'bu-debate',
        title: 'BU Debate',
        description: '',
        videoType: 'youtube',
        videoUrl: 'https://youtu.be/c9SvGeHA3vY',
        thumbnail: {
          src: `${assetPrefix}/debatetitlecard.png`,
          alt: 'BU Debate preview',
          type: 'image',
        },
        stillFrames: [],
      },
    ],
  },
  {
    slug: 'short-films',
    title: 'Short Films',
    cardImage: `${assetPrefix}/hd1.jpg`,
    cardImageAlt: 'Short films preview',
    projects: [
      {
        slug: 'crossing-japan',
        title: 'Crossing Japan',
        description: '',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=K52ULfZdbqI&t=86s',
        thumbnail: {
          src: `${assetPrefix}/crossingjapan.png`,
          alt: 'Rel short film preview',
          type: 'image',
        },
        stillFrames: [],
      },
      {
        slug: 'hungry-drudge',
        title: 'Hungry Drudge',
        description: '',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/watch?v=P5pREr7TDWw',
        thumbnail: {
          src: `${assetPrefix}/hd1.jpg`,
          alt: 'Hungry Drudge preview',
          type: 'image',
        },
        stillFrames: [
          {
            src: `${assetPrefix}/hungrydrudgetitle.jpg`,
            alt: 'Hungry Drudge still frame 1',
          },
          {
            src: `${assetPrefix}/hd2.jpg`,
            alt: 'Hungry Drudge still frame 2',
          },
          {
            src: `${assetPrefix}/hd3.jpg`,
            alt: 'Hungry Drudge still frame 3',
          },
          {
            src: `${assetPrefix}/hd4.jpg`,
            alt: 'Hungry Drudge still frame 4',
          },
        ],
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
