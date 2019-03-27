import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import translationEN from './locales/en/translation.json';
import translationPL from './locales/pl/translation.json';

// the translations
const resources = {
  en: {
    translations: {
        "Welcome to React.js": "Welcome to React.js",
        "Restart": "Restart",
        "Number of moves": "Number of moves",
        "Difficulty level": "Difficulty level"
    }
  },
  pl: {
    translations: {
        "Welcome to React.js": "Witaj w React.js",
        "Restart": "Zrestartuj",
        "Number of moves": "Liczba ruchów",
        "Difficulty level": "Poziom trudności"
    }
  }
};

i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    fallbackLng: 'en',
    debug: true,
 
    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    
    react: {
        wait: true
      }
  });

export default i18n;