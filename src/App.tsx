import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));
const Contact = lazy(() => import('./pages/Contact'));
const Reel = lazy(() => import('./pages/Reel'));
const WorkCategory = lazy(() => import('./pages/WorkCategory'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const App: React.FC = () => {
  const assetPrefix = process.env.PUBLIC_URL || '';
  const grainStyle = { '--grain-url': `url(${assetPrefix}/noise.png)` } as React.CSSProperties;

  return (
    <Router>
      <div className="App has-grain" style={grainStyle}>
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              <img src="/AlexSkySignature2.png" alt="Alexander Sky Logo" />
            </Link>
          </div>
          <div className="nav-center">ALEXANDER SKY BISCHOF</div>
          <div className="nav-right">
            <Link to="/work" className="nav-link">
              WORK
            </Link>
            <Link to="/contact" className="nav-link">
              CONTACT
            </Link>
          </div>
        </nav>

        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/reel" element={<Reel />} />
            <Route
              path="/work/personal"
              element={<ProjectDetail fixedCategorySlug="personal" fixedProjectSlug="personal" />}
            />
            <Route path="/work/:categorySlug" element={<WorkCategory />} />
            <Route path="/work/:categorySlug/:projectSlug" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
