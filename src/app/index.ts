import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import uk from "./locales/uk.json";

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: "uk",
  fallbackWarn: false,
  missingWarn: false,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  messages: {
    en,
    uk,
  },
});

import { router, pinia } from "./providers";
import "./styles/main.css";
import App from "./App.vue";
export const app = createApp(App).use(pinia).use(router).use(i18n);
