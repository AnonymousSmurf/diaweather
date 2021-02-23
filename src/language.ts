import { createI18n } from "vue-i18n";

const messages = {
  en: {
    search: "Search for station",
    weather: {
      measuring: "Measuring station",
      region: "Location"
    },
    author: "Made by"
  },
  nl: {
    search: "Zoek naar station",
    weather: {
      measuring: "Meetstation",
      region: "Locatie"
    },
    author: "Gemaakt door"
  }
};

const hasWindow = typeof window !== "undefined";
const lang = ((hasWindow && window.navigator.language) || "en").substr(0, 2);

export default createI18n({
  locale: lang,
  fallbackLocale: "nl",
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  globalInstall: false
});
