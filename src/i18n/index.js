import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ro from "./ro.json";
import en from "./en.json";
import de from "./de.json";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: "ro",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ro: ro,
      en: en,
      de: de,
    },
  });

export default i18n;
