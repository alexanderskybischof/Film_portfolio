import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'ja';

export type LocalizedText = {
  en: string;
  ja: string;
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const STORAGE_KEY = 'site-language';

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const getLocalizedText = (text: LocalizedText, language: Language) => text[language];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'ja' ? 'ja' : 'en';
    } catch {
      // Storage can be disabled by browser privacy settings.
      return 'en';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Keep language switching available even when preferences cannot be saved.
    }
    document.documentElement.lang = language === 'ja' ? 'ja' : 'en';
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage: () => setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'ja' : 'en')),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};
