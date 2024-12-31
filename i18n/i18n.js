import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./translations/en.json";
import trTranslation from "./translations/tr.json";

const resources = {
  en: {
    translation: enTranslation
  },
  tr: {
    translation: trTranslation
  }
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: "tr",
    fallbackLng: ["en", "tr"],
    interpolation: {
      escapeValue: false
    },
    supportedLngs: ["en", "tr"]
  });

export default i18next;
