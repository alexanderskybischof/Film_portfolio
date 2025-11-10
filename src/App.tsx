import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Work from './pages/Work';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              <img src="/AlexSkySignature2.png" alt="Alexander Sky Logo" />
            </Link>
          </div>
          <div className="nav-right">
            <Link to="/work" className="nav-link">
              WORK
            </Link>
            <Link to="/contact" className="nav-link">
              CONTACT
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
