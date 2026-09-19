import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './i18n';

const LanguageControl = () => {
  const { language, toggleLanguage } = useLanguage();
  return <button onClick={toggleLanguage}>{language}</button>;
};

afterEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
});

test('renders and switches language when browser storage access is blocked', () => {
  jest.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
    throw new DOMException('Storage is blocked', 'SecurityError');
  });
  render(<LanguageProvider><LanguageControl /></LanguageProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'en' }));
  expect(screen.getByRole('button', { name: 'ja' })).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('ja');
});

test('keeps a saved language and allows switching when storage writes fail', () => {
  localStorage.setItem('site-language', 'ja');
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new DOMException('Storage quota exceeded', 'QuotaExceededError');
  });
  render(<LanguageProvider><LanguageControl /></LanguageProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'ja' }));
  expect(screen.getByRole('button', { name: 'en' })).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('en');
});
