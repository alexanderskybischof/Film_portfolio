import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import { LanguageProvider, useLanguage } from './i18n';

const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));
const Contact = lazy(() => import('./pages/Contact'));
const Reel = lazy(() => import('./pages/Reel'));
const WorkCategory = lazy(() => import('./pages/WorkCategory'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const AppShell: React.FC = () => {
  const assetPrefix = process.env.PUBLIC_URL || '';
  const grainStyle = { '--grain-url': `url(${assetPrefix}/noise.png)` } as React.CSSProperties;
  const { language, toggleLanguage } = useLanguage();
  const navCopy =
  language === 'ja'
    ? {
        logoAlt: 'アレクサンダー・スカイのロゴ',
        name: '木下アレックサンダースカイ',
        work: '作品',
        contact: '連絡先',
        toggle: 'English',
        toggleAria: 'Switch site language to English',
      }
    : {
        logoAlt: 'Alexander Sky Logo',
        name: 'ALEXANDER SKY BISCHOF',
        work: 'WORK',
        contact: 'CONTACT',
        toggle: '日本語',
        toggleAria: 'Switch site language to Japanese',
      };

  return (
    <div className="App has-grain" style={grainStyle}>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <img src="/AlexSkySignature2.png" alt={navCopy.logoAlt} />
          </Link>
        </div>
        <div className="nav-center">{navCopy.name}</div>
        <div className="nav-right">
          <Link to="/work" className="nav-link">
            {navCopy.work}
          </Link>
          <Link to="/contact" className="nav-link">
            {navCopy.contact}
          </Link>
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
          <Route path="/work" element={<Work />} />
          <Route path="/work/reel" element={<Reel />} />
          <Route
            path="/work/personal"
            element={<ProjectDetail fixedCategorySlug="personal" fixedProjectSlug="crossing-japan" />}
          />
          <Route path="/work/:categorySlug" element={<WorkCategory />} />
          <Route path="/work/:categorySlug/:projectSlug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
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
