import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en_translation.json'; 
import viTranslation from './locales/vi_translation.json'; 

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      vi: {
        translation: viTranslation,
      },
    },
    lng: 'en', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ mặc định nếu ngôn ngữ được chọn không có sẵn
    interpolation: {
      escapeValue: false, // React tự xử lý escape
    },
  });

export default i18n;
