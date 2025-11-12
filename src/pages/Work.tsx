import React, { useEffect } from 'react';

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

type WorkItem = {
  title: string;
  roles: string[];
  youtubeId?: string;
  instagramUrl?: string;
};

const workItems: WorkItem[] = [
  {
    title: '',
    roles: [''],
    youtubeId: 'P5pREr7TDWw',
  },
  {
    title: '',
    roles: [''],
    youtubeId: 'LUbVYsNQ7yE',
  },
  {
    title: '',
    roles: [''],
    youtubeId: 'nppfCznkF3E',
  },
  {
    title: '',
    roles: [''],
    instagramUrl: 'https://www.instagram.com/p/DLS2DdKiqWH/embed',
  },
  {
    title: '',
    roles: [''],
    instagramUrl: 'https://www.instagram.com/reel/DDYmsHhsbYx/embed',
  },
  {
    title: '',
    roles: [''],
    instagramUrl: 'https://www.instagram.com/reel/DPCghubgoKt/embed',
  },
  {
    title: '',
    roles: [''],
    instagramUrl: 'https://www.instagram.com/reel/DPCg2Bigtuc/embed',
  },
  {
    title: '',
    roles: [''],
    instagramUrl: 'https://www.instagram.com/reel/DPCf-q-glfK/embed',
  },
  {
    title: '',
    roles: [''],
    instagramUrl: 'https://www.instagram.com/p/DPCpx-LjSEJ/embed',
  },
];

const ensureInstagramEmbedScript = () => {
  // Using direct iframe embeds; no external script required.
};

const Work: React.FC = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.work-card');

    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      cards.forEach((card) => observer.observe(card));
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    ensureInstagramEmbedScript();
  }, []);

  return (
    <main className="page page--work">
      <div className="page-content page-content--work">
        <h1>Work</h1>

        <section className="work-grid">
          {workItems.map((item, index) => (
            <article className="work-card" key={`${item.title}-${index}`}>
              <div className="work-card__label">
                <span className="work-card__title">{item.title}</span>
                <span className="work-card__roles">{item.roles.join(' • ')}</span>
              </div>
              <div className="work-card__frame">
                {item.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeId}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                ) : (
                  <iframe
                    src={item.instagramUrl}
                    title={item.title}
                    allowFullScreen
                    frameBorder={0}
                    loading="lazy"
                  ></iframe>
                )}
              </div>
            </article>
          ))}
        </section>

        <footer className="footer footer--inline">
          <a
            href="https://www.instagram.com/askypic"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img src="igicon.png" alt="Instagram" className="logo-ig" />
          </a>
          <a
            href="https://www.tiktok.com/@kinnoshitasky"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img src="ttlogo.png" alt="TikTok" className="logo-tiktok" />
          </a>
          <a
            href="https://www.youtube.com/@kinoshitasky"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img src="ytgreenlogo.png" alt="YouTube" className="logo-yt" />
          </a>
        </footer>
      </div>
    </main>
  );
};

export default Work;
