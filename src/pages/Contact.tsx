import React from 'react';

const Contact: React.FC = () => {
  return (
    <main className="page page--contact">
      <div className="page-content contact-content">
        <h1>Contact</h1>
        <p>alex@stomii.com</p>

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
      </div>
    </main>
  );
};

export default Contact;
