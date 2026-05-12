import React from 'react';
import SiteFooter from '../components/SiteFooter';
import { useLanguage } from '../i18n';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const title = language === 'ja' ? '連絡先' : 'Contact';

  return (
    <main className="page page--contact">
      <div className="page-content contact-content">
        <h1>{title}</h1>
        <p>alex@stomii.com</p>

        <SiteFooter />
      </div>
    </main>
  );
};

export default Contact;
