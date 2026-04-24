export type WorkCategoryKey = 'reel' | 'commercial-work' | 'short-films' | 'personal';

export type WorkProject = {
  slug: string;
  title: string;
  description?: string;
  videoType: 'youtube' | 'local';
  videoUrl: string;
  secondaryVideoUrl?: string;
  videos?: Array<{
    title: string;
    videoType: 'youtube' | 'local';
    videoUrl?: string;
  }>;
  thumbnail: {
    src?: string;
    alt: string;
    type: 'image' | 'video';
    objectPosition?: string;
  };
  stillFrames: Array<{
    src?: string;
    alt: string;
    label?: string;
    solidBackground?: boolean;
  }>;
};

export type WorkCategory = {
  slug: WorkCategoryKey;
  title: string;
  cardImage?: string;
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
        slug: 'kuro-kahii-sydney',
        title: 'Kuro Bar & Dining',
        description:
          'The following videos are part of a series of five promotional pieces created for Kuro Bar & Dining. They were designed for use in live venue advertising, with a focus on capturing the atmosphere and visual appeal of the space.',
        videoType: 'local',
        videoUrl: '',
        videos: [
          { title: 'Short Video 1', videoType: 'local', videoUrl: `${assetPrefix}/kuro1.2.mov` },
          { title: 'Short Video 2', videoType: 'local', videoUrl: `${assetPrefix}/kuro2.2.mov` },
          { title: 'Short Video 3', videoType: 'local', videoUrl: `${assetPrefix}/kuro3.mov` },
          { title: 'Short Video 4', videoType: 'local', videoUrl: `${assetPrefix}/kuro4.mov` },
          { title: 'Short Video 5', videoType: 'local', videoUrl: `${assetPrefix}/kuro5.mov` },
        ],
        thumbnail: {
          src: `${assetPrefix}/kurostill_2.1.1.jpg`,
          alt: 'Kuro Bar & Dining preview',
          type: 'image',
          objectPosition: 'center 97%',
        },
        stillFrames: [
          {
            src: `${assetPrefix}/Kuro1.jpg`,
            alt: 'Kuro Bar & Dining photo 1',
          },
          {
            src: `${assetPrefix}/Kuro2.jpg`,
            alt: 'Kuro Bar & Dining photo 2',
          },
          {
            src: `${assetPrefix}/Kuro3.jpg`,
            alt: 'Kuro Bar & Dining photo 3',
          },
          {
            src: `${assetPrefix}/Kuro4.jpg`,
            alt: 'Kuro Bar & Dining photo 4',
          },
          {
            src: `${assetPrefix}/Kuro4.5.jpg`,
            alt: 'Kuro Bar & Dining photo 5',
          },
          {
            src: `${assetPrefix}/Kuro5.jpg`,
            alt: 'Kuro Bar & Dining photo 6',
          },
          {
            src: `${assetPrefix}/Kuro6.jpg`,
            alt: 'Kuro Bar & Dining photo 7',
          },
          {
            src: `${assetPrefix}/Kuro7.jpg`,
            alt: 'Kuro Bar & Dining photo 8',
          },
          {
            src: `${assetPrefix}/Kuro8.jpg`,
            alt: 'Kuro Bar & Dining photo 9',
          },
        ],
      },
      {
        slug: 'kahii',
        title: 'Kahii',
        description: "Short Videos produced for Kahii's social media accounts",
        videoType: 'local',
        videoUrl: '',
        videos: [
          { title: 'Short Video 1', videoType: 'youtube', videoUrl: 'https://youtu.be/KXBljh_hEgc' },
          { title: 'Short Video 2', videoType: 'local', videoUrl: `${assetPrefix}/kahii2.mov` },
        ],
        thumbnail: {
          src: `${assetPrefix}/kahiistill.jpg`,
          alt: 'Kahii preview',
          type: 'image',
        },
        stillFrames: [],
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
  {
    slug: 'personal',
    title: 'Personal',
    cardImageAlt: 'Personal work preview',
    projects: [
      {
        slug: 'personal',
        title: 'Personal',
        description: 'Media coming soon',
        videoType: 'local',
        videoUrl: '',
        thumbnail: {
          alt: 'Personal preview',
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
