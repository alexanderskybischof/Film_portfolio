import React, { useEffect, useRef } from 'react';

const Home: React.FC = () => {
  const infoContentRef = useRef<HTMLDivElement | null>(null);
  const infoImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targets: (Element | null)[] = [infoContentRef.current, infoImageRef.current];
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    targets.forEach((target) => target && observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="hero-section" id="home">
        <video className="background-video" autoPlay loop muted>
          <source src="/gontitivid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-text">
          <img src="/AlexSkySignature.png" alt="Alexander Sky Logo middle" />
        </div>
      </header>

      <section className="info-section" id="about">
        <div className="bio-container">
          <div className="info-content" ref={infoContentRef}>
            <h2>ALEXANDER SKY</h2>
            <p>
              I'm a 20 yr. old freelance filmmaker based in Berkeley, CA, Boston, MA, and Osaka, Japan. I shoot most of my
              content on a Sony a7S III, Fuji X-S10, Nikon F3-HP, and my mom&apos;s old camcorder. In my freetime I work on personal projects and enjoy the outdoors in preferably warm weather - whether that's through surfing, climbing, hiking, etc...
              I currently attend Boston University, where after I hope to create a video production company or get a job related to Data Science.
            </p>
          </div>

          <div className="info-image" ref={infoImageRef}>
            <img src="/Alex.jpeg" alt="Alexander Sky portrait" />
          </div>
        </div>
      </section>

      <footer className="footer">
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
    </>
  );
};

export default Home;
