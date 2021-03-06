import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import translationEN from './locales/en/translation.json';
import translationPL from './locales/pl/translation.json';

// the translations
const resources = {
  en: {
    translations: translationEN
  },
  pl: {
    translations: translationPL
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .use(detector) //should detect language, needs to be before init
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    load: 'languageOnly',

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    react: {
      wait: true,
      transSupportBasicHtmlNodes: true
    }
  });

export default i18n;