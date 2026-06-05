import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import zh from './locales/zh/translation.json';

const isBrowser = typeof window !== 'undefined';

const savedLanguage =
  (isBrowser && localStorage.getItem('i18nextLng')) || 'en';

// Keep the document's lang attribute in sync with the active language so screen
// readers and search engines see the correct language. Guarded for SSR.
const syncDocumentLang = (lng: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
    },
  });

syncDocumentLang(savedLanguage);

i18n.on('languageChanged', (lng) => {
  if (isBrowser) {
    localStorage.setItem('i18nextLng', lng);
  }
  syncDocumentLang(lng);
});

export default i18n;
