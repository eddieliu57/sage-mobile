import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import english from '../locale/en.json';
import indonesian from '../locale/in.json';

export const resources = {
  en: {
    translation: english,
  },
  in: {
    translation: indonesian,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

export default i18n;
