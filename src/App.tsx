import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { LanguageProvider, useLanguage } from './i18n';

const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));
const Stills = lazy(() => import('./pages/Stills'));
const Reel = lazy(() => import('./pages/Reel'));
const WorkCategory = lazy(() => import('./pages/WorkCategory'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

type CursorSplash = {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
};

const DotCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [splashes, setSplashes] = useState<CursorSplash[]>([]);
  const splashId = useRef(0);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        return;
      }

      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handlePointerLeave = () => setIsVisible(false);
    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') {
        setIsPressed(false);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) {
        return;
      }

      setIsPressed(true);

      const nextSplashes = [0, 1, 2].map((item) => {
        splashId.current += 1;

        return {
          id: splashId.current,
          x: event.clientX,
          y: event.clientY,
          angle: -78 + item * 54 + Math.random() * 18,
          distance: 16 + Math.random() * 14,
        };
      });

      setSplashes((currentSplashes) => [...currentSplashes, ...nextSplashes]);
      window.setTimeout(() => {
        setSplashes((currentSplashes) =>
          currentSplashes.filter((splash) => !nextSplashes.some((nextSplash) => nextSplash.id === splash.id)),
        );
      }, 620);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <>
      <div
        className={`dot-cursor${isVisible ? ' dot-cursor--visible' : ''}${isPressed ? ' dot-cursor--pressed' : ''}`}
        style={{ left: position.x, top: position.y }}
        aria-hidden="true"
      />
      {splashes.map((splash) => (
        <span
          key={splash.id}
          className="cursor-splash"
          style={
            {
              left: splash.x,
              top: splash.y,
              '--splash-angle': `${splash.angle}deg`,
              '--splash-distance': `${splash.distance}px`,
            } as React.CSSProperties
          }
          aria-hidden="true"
        />
      ))}
    </>
  );
};

const AppShell: React.FC = () => {
  const assetPrefix = process.env.PUBLIC_URL || '';
  const grainStyle = { '--grain-url': `url(${assetPrefix}/noise.png)` } as React.CSSProperties;
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const isInfoActive = location.pathname === '/' || location.pathname === '/info';
  const navCopy =
  language === 'ja'
    ? {
        logoAlt: 'アレクサンダー・スカイのロゴ',
        name: '木下アレックサンダースカイ',
        work: '作品',
        stills: 'スチル',
        info: '情報',
        toggle: 'English',
        toggleAria: 'Switch site language to English',
      }
    : {
        logoAlt: 'Alexander Sky Logo',
        name: 'ALEXANDER SKY BISCHOF',
        work: 'WORK',
        stills: 'STILLS',
        info: 'INFO',
        toggle: '日本語',
        toggleAria: 'Switch site language to Japanese',
      };

  return (
    <div className="App has-grain" style={grainStyle}>
      <DotCursor />
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <img src="/AlexSkySignature2.png" alt={navCopy.logoAlt} draggable={false} />
          </Link>
        </div>
        <div className="nav-center">{navCopy.name}</div>
        <div className="nav-right">
          <NavLink to="/work" className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}>
            {navCopy.work}
          </NavLink>
          <NavLink to="/stills" className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}>
            {navCopy.stills}
          </NavLink>
          <NavLink to="/info" className={`nav-link${isInfoActive ? ' nav-link--active' : ''}`}>
            {navCopy.info}
          </NavLink>
          <button
            type="button"
            className="nav-language-toggle"
            onClick={toggleLanguage}
            aria-pressed={language === 'ja'}
            aria-label={navCopy.toggleAria}
          >
            {navCopy.toggle}
          </button>
        </div>
      </nav>

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/stills" element={<Stills />} />
          <Route path="/work/reel" element={<Reel />} />
          <Route
            path="/work/personal"
            element={<ProjectDetail fixedCategorySlug="personal" fixedProjectSlug="crossing-japan" />}
          />
          <Route path="/work/:categorySlug" element={<WorkCategory />} />
          <Route path="/work/:categorySlug/:projectSlug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Navigate to="/info" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </Router>
  );
};

export default App;
